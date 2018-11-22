import {uuid} from '../utils'

enum TaskState {
  Normal = 0,
  Important,
  Done,
}

export interface Task {
  id: string
  title: string
  description: string
  beginDate: string | null
  endDate: string | null
  parentId: string | null
  childrenIds: string[]
  state: TaskState
  tags: string[]
}

export function create(task: Partial<Task>, index?: number): Task {
  if (!task.title) {
    throw new Error('task must have title on it')
  }
  if (!task.id) {
    task.id = uuid(index)
  }

  return {
    description: '',
    beginDate: null,
    endDate: null,
    parentId: null,
    childrenIds: [],
    tags: [],
    state: TaskState.Normal,
    title: task.title,
    id: task.id,
  }
}
