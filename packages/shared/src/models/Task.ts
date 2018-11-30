import {uuid} from '../utils'
import {Base} from './Base'

enum TaskState {
  Normal = 0,
  Important,
  Done,
}

export interface Task extends Base {
  title: string
  description: string
  endDate: string | null
  dueDate: string | null
  parentId: string | null
  childrenIds: string[]
  state: TaskState
  tags: string[]
}

export function create(task: Partial<Task>, index: number): Task {
  if (!task.title) {
    throw new Error('task must have title on it')
  }
  if (!task.id) {
    task.id = uuid(index)
  }

  return {
    description: '',
    endDate: null,
    dueDate: null,
    parentId: null,
    childrenIds: [],
    tags: [],
    state: TaskState.Normal,
    id: task.id,
    title: task.title,
    ...task,
  }
}
