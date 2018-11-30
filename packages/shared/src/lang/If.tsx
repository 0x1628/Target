import * as React from 'react'
import {UnmountProps} from './index'

interface IfProps {
  value: any
  children: JSX.Element | JSX.Element[]
}

interface IfState {
  inited: boolean
  destroy: boolean
}

class If extends React.Component<IfProps, IfState> {
  render() {
    const {value, children} = this.props
    const condition = Boolean(value)
    if (condition) {
      return children
    } else {
      return null
    }
  }
}

export default If
