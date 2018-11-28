import * as React from 'react'
import styled from 'shared/styled'
import Portal, {PortalProps} from './Portal'
import If from 'shared/lang/If'

interface ModalProps extends PortalProps {
  mask: boolean
  onRequestClose(): void
}

const MaskWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.maskBg};
`

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
