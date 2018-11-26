import * as React from 'react'
import {createPortal} from 'react-dom'

interface ModalProps {
  mask: boolean
}

class Modal extends React.Component<ModalProps> {
  static defaultProps: Partial<ModalProps> = {
    mask: true,
  }

  el!: HTMLElement
  root!: HTMLElement
  constructor(props: ModalProps) {
    super(props)
    if (typeof document !== 'undefined') {
      this.el = document.createElement('div')
    }
  }

  componentDidMount() {
    this.root = document.getElementById('modal-root')!
    this.root.appendChild(this.el)
  }

  componentWillUnmount() {
    if (this.root) {
      this.root.removeChild(this.el)
    }
  }

  render() {
    const {mask, children} = this.props
    return createPortal((
      <>
        {mask &&
        <div>mask</div>
        }
        {children}
      </>
    ), this.el)
  }
}

class Dialog extends React.Component {
  render() {
    const {children} = this.props
    return (
      <Modal>hahaha {children}</Modal>
    )
  }
}

export default Dialog
