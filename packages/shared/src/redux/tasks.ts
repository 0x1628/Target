import {ThunkAction} from 'redux-thunk'
import {RootState} from './index'
import {create, Task} from '../models/Task'

enum ActionName {
  Add = 'tasks:add',
  Delete = 'tasks:delete',
  Modify = 'tasks:update',
  Get = 'tasks:get',
}

type Actions =
  {type: ActionName.Add, payload: Task, meta: Meta}
  | {type: ActionName.Delete, payload: Task, meta: Meta}

export function addTask(task: Partial<Task>): ThunkAction<void, RootState, null, Actions> {
  return (dispatch, getState) => {
    const last = getState().tasks.meta.last

    dispatch({
      type: ActionName.Add,
      payload: create({
        ...task,
      }, last + 1),
      meta: {
        last: last + 1,
      },
    })
  }
}

type Meta = {
  last: number,
}

export interface TaskReducerState {
  meta: Meta
  data: {
    [key: string]: Task;
  }
}

const defaultState: TaskReducerState = {
  meta: {
    last: 0,
  },
  data: {},
}

export default function (state = {...defaultState}, action: Actions) {
  switch (action.type) {
    case ActionName.Add: {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.id]: action.payload,
        },
        meta: {
          ...state.meta,
          last: action.meta.last,
        },
      }
    }
    default:
      return state
  }
}
