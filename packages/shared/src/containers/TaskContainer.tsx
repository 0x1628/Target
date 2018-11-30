import * as React from 'react'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {addTask as reduxAddTask} from '../redux/tasks'
import {Task} from '../models/Task'

export interface CallbackArguments {
  task: Task | null
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
  render() {
    const {addTask, task} = this.props
    return this.props.children({
      task,
      actions: {
        addTask,
      },
    })
  }
}

function mapStateToProps(state: RootState, props: TaskContainerProps) {
  const tasks = state.tasks.data
  return {
    task: tasks.find(t => t.id === props.id) || null,
  }
}

type DispatchMethods = {
  addTask: typeof reduxAddTask,
}

const mapDispatchToProps: DispatchMethods = {
  addTask: reduxAddTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)
