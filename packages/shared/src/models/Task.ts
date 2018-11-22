import {uuid} from '../utils'

export function create(task: Partial<Task>, index?: number): Partial<Task> {
  if (!task.title) {
    throw new Error('task must have title on it')
  }
  if (!task.id) {
    task.id = uuid(index)
  }

  return task
}
