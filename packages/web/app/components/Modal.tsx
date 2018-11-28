import * as React from 'react'
import Portal, {PortalProps} from './Portal'
import If from 'shared/lang/If'

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
        <If value={mask}>
          <div onClick={onRequestClose}>mask</div>
        </If>
        {children}
      </Portal>
    )
  }
}

export default Modal
