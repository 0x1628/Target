import {ThunkAction} from 'redux-thunk'
import {RootState} from './index'
import {create} from '../models/Task'

export function addTask(task: Partial<Task>): ThunkAction<any, RootState, any, any> {
  return (dispatch, getState) => {
    const last = getState().tasks.meta.last

    return dispatch({
      type: 'test',
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

export default function (state = {...defaultState}, action: any) {
  console.log(action)
  switch (action.type) {
    case 'test': {
      console.log(233)
      return state
    }
    default:
      return state
  }
}
