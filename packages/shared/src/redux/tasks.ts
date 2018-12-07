import {ThunkAction} from 'redux-thunk'
import {RootState} from './index'
import {Task, create} from '../models/Task'
import {execSyncWithFullResult, ListMeta, usedb} from '../db/index'

enum ActionName {
  Add = 'tasks:add',
  Delete = 'tasks:delete',
  Modify = 'tasks:update',
  Get = 'tasks:get',
}

type Actions =
  {type: ActionName.Add, payload: Partial<Task>}
  | {type: ActionName.Delete, payload: Task}

export function addTask(task: Partial<Task>): ThunkAction<void, RootState, null, Actions> {
  return (dispatch, getState) => {
    const last = getState().tasks.meta.last

    dispatch({
      type: ActionName.Add,
      payload: task,
    })
  }
}

export type TaskReducerState = {
  meta: ListMeta,
  data: Task[],
}

const defaultState: TaskReducerState = {
  meta: {
    last: 0,
  },
  data: [],
}

export default function (state = {...defaultState}, action: Actions) {
  switch (action.type) {
    case ActionName.Add: {
      const task = create(action.payload, state.meta.last)
      let result = execSyncWithFullResult<Task>('add', 'tasks', task)
      if (typeof task.parentId === 'string') {
        const parentTask = usedb().findById('tasks', task.parentId).target as Task
        result = execSyncWithFullResult<Task>('modify', 'tasks', {
          ...parentTask,
          childrenIds: parentTask.childrenIds.concat(task.id),
        })
      }
      return result
    }
    default:
      return state
  }
}
