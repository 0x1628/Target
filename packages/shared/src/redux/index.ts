import {combineReducers} from 'redux'
import tasks, {TaskReducerState} from './tasks'

const createRootReducer = () => {
  return combineReducers({
    test(state = {}) {
      return state
    },
    tasks,
  })
}

export {createRootReducer}

export type RootState = {
  tasks: TaskReducerState,
}
