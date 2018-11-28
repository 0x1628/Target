import * as React from 'react'
import {createPortal} from 'react-dom'
import {UnmountProps} from 'shared/lang/index'

// tslint:disable-next-line
export interface PortalProps extends UnmountProps {
  //
}

class Portal extends React.Component<PortalProps> {
  static defaultProps: PortalProps = {unmountDelay: 0}

  el!: HTMLElement
  root!: HTMLElement

  constructor(props: PortalProps) {
    super(props)
    if (typeof document !== 'undefined') {
      this.el = document.createElement('div')
    }
  }

  componentDidMount() {
    this.root = document.getElementById('portal-root')!
    this.root.appendChild(this.el)
  }

  componentWillUnmount() {
    if (this.root) {
      this.root.removeChild(this.el)
    }
  }

  render() {
    return createPortal(this.props.children, this.el)
  }
}

export default Portal
