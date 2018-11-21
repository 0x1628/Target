import * as React from 'react'
import {connect} from 'react-redux'
import {RootState} from '../redux'

interface CallbackArguments {
  tasks: any[]
}

interface RecordContainerProps {
  date: string
  children(args: CallbackArguments): JSX.Element
}

class RecordContainer extends React.Component<RecordContainerProps> {
  render() {
    return this.props.children({tasks: []})
  }
}

function mapStateToProps(state: RootState) {
  const t = state.tasks[123]
  return state
}

export default connect(mapStateToProps)(RecordContainer)
