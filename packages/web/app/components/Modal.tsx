import * as React from 'react'
import Portal, {PortalProps} from './Portal'

interface ModalProps extends PortalProps {
  mask: boolean
  onRequestClose(): void
}

class Modal extends React.Component<ModalProps> {
  static defaultProps: Partial<ModalProps> = {
    mask: true,
  }

  render() {
    const {mask, children, onRequestClose, ...rest} = this.props
    return (
      <Portal {...rest}>
        {mask &&
        <div onClick={onRequestClose}>mask</div>
        }
        {children}
      </Portal>
    )
  }
}

export default Modal
