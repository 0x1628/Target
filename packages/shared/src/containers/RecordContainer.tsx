import * as React from 'react'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {addTask as reduxAddTask} from '../redux/tasks'

export interface CallbackArguments {
  tasks: any[]
  actions: DispatchMethods
}

interface RecordContainerProps {
  date: string
  children(args: CallbackArguments): JSX.Element
}

export const RecordContainerContext = React.createContext({actions: {} as DispatchMethods})

class RecordContainer extends React.Component<RecordContainerProps & DispatchMethods> {
  render() {
    const {addTask} = this.props
    return this.props.children({
      tasks: [],
      actions: {
        addTask,
      },
    })
  }
}

function mapStateToProps(state: RootState) {
  // const t = state.tasks[123]
  return state
}

type DispatchMethods = {
  addTask: any,
}

const mapDispatchToProps: DispatchMethods = {
  addTask: reduxAddTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordContainer)
