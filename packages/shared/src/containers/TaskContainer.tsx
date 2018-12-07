import * as React from 'react'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {addTask as reduxAddTask} from '../redux/tasks'
import {Task} from '../models/Task'

export interface CallbackArguments {
  task: Task | null
  subTasks: Task[]
  parentTasks: Task[]
  actions: DispatchMethods
}

interface TaskContainerProps {
  id: string
  children(args: CallbackArguments): JSX.Element
}

class TaskContainer extends React.Component<
  TaskContainerProps &
  ReturnType<typeof mapStateToProps> &
  DispatchMethods
> {
  findSubTasks(): Task[] {
    const {task, tasks} = this.props
    if (!task) {
      return []
    }
    const subTasks = task.childrenIds.map(cid => tasks.find(t => t.id === cid))
    return subTasks.filter(Boolean) as Task[]
  }

  findParentTasks(): Task[] {
    const {task, tasks} = this.props
    const result: Task[] = []
    if (!task) return result
    let {parentId} = task
    while (parentId) {
      const parent = tasks.find(t => t.id === parentId)
      if (!parent) {
        throw new Error('System Error')
      }
      result.unshift(parent)
      parentId = parent.parentId
    }
    return result
  }

  render() {
    const {addTask, task} = this.props

    const subTasks = this.findSubTasks()
    const parentTasks = this.findParentTasks()
    return this.props.children({
      task,
      actions: {
        addTask,
      },
      subTasks,
      parentTasks,
    })
  }
}

function mapStateToProps(state: RootState, props: TaskContainerProps) {
  const tasks = state.tasks.data
  return {
    task: tasks.find(t => t.id === props.id) || null,
    tasks,
  }
}

type DispatchMethods = {
  addTask: typeof reduxAddTask,
}

const mapDispatchToProps: DispatchMethods = {
  addTask: reduxAddTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)
