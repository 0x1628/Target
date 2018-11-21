import {TaskInterface} from '../models/Task'

export interface TaskReducerState {
  [key: string]: TaskInterface
}

const defaultState: TaskReducerState = {}

export default function (state = {...defaultState}, action: any) {
  return state
}
