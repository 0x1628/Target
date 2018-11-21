enum TaskState {
  Normal = 0,
  Important,
  Done,
}

export interface TaskInterface {
  id: string
  title: string
  description: string
  beginDate: string
  endDate: string
  parentId: string
  childrenIds: string[]
  state: TaskState
  tags: string[]
}
