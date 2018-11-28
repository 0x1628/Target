import * as React from 'react'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {addTask as reduxAddTask} from '../redux/tasks'
import {Task} from '../models/Task'

export interface CallbackArguments {
  tasks: Task[]
  actions: DispatchMethods
}

interface RecordContainerProps {
  date: string
  children(args: CallbackArguments): JSX.Element
}

export const RecordContainerContext = React.createContext({actions: {} as DispatchMethods})

class RecordContainer extends React.Component<
  RecordContainerProps &
  ReturnType<typeof mapStateToProps> &
  DispatchMethods
> {
  render() {
    const {addTask, tasks} = this.props
    return this.props.children({
      tasks,
      actions: {
        addTask,
      },
    })
  }
}

function mapStateToProps(state: RootState, props: RecordContainerProps) {
  let tasks = state.tasks.data
  if (props.date) {
    tasks = tasks.filter(task => task.endDate === props.date)
  }
  return {
    tasks,
  }
}

type DispatchMethods = {
  addTask: typeof reduxAddTask,
}

const mapDispatchToProps: DispatchMethods = {
  addTask: reduxAddTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordContainer)
