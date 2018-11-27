import * as React from 'react'

interface IfProps {
  value: any
  children: JSX.Element
}

interface IfState {
  inited: boolean
  destroy: boolean
}

class If extends React.Component<IfProps> {
  static getDerivedStateFromProps(nextProps: IfProps, state: IfState) {
    if (state.inited) {
      return null
    }
    if (Boolean(nextProps.value)) {
      return {inited: true}
    }
    return null
  }

  state: IfState = {destroy: false, inited: false}

  render() {
    const {value, children} = this.props
    const {destroy, inited} = this.state

    const condition = Boolean(value)

    if (!inited) {
      return null
    }

    if (condition) {
      return children
    } else if (destroy) {
      return null
    } else {
      const childProps = children.props
      if (childProps.unmountDelay) {
        setTimeout(() => {
          this.setState({destroy: true})
        }, childProps.unmountDelay)
        return children
      }
      return null
    }
  }
}

export default If
