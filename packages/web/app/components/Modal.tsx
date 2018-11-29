import * as React from 'react'
import styled from 'shared/styled'
import Portal, {PortalProps} from './Portal'
import If from 'shared/lang/If'

interface ModalProps extends PortalProps {
  mask: boolean
  shouldCloseOnMaskClick: boolean
  onRequestClose(): void
}

const showClassName = 'modal--show'
const hideClassName = 'modal--hide'
const transitionDuration = 200

const MaskWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.maskBg};
  opacity: .3;
  transition: opacity ${transitionDuration / 1000}s ease-out;

  .${showClassName} & {
    opacity: 1;
  }

  .${hideClassName} & {
    opacity: .3;
  }
`

const ChildWrapper = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
`

class Modal extends React.Component<ModalProps> {
  static defaultProps: Partial<ModalProps> = {
    mask: true,
    shouldCloseOnMaskClick: false,
  }

  static showClassName = showClassName
  static hideClassName = hideClassName
  static transitionDuration = transitionDuration

  portalEl!: HTMLElement | null

  componentDidMount() {
    const {mask} = this.props
    setTimeout(() => {
      if (this.portalEl) {
        this.portalEl.classList.add(Modal.showClassName)
      }
    })
  }

  beginClose() {
    const {onRequestClose} = this.props
    onRequestClose()
    if (this.portalEl) {
      this.portalEl.classList.add(Modal.hideClassName)
    }
  }

  handleMaskClick = () => {
    const {shouldCloseOnMaskClick} = this.props

    if (shouldCloseOnMaskClick) {
      this.beginClose()
    }
  }

  render() {
    const {mask, children, onRequestClose, ...rest} = this.props
    return (
      <Portal {...rest} ref={el => this.portalEl = el}>
        <If value={mask}>
          <MaskWrapper onClick={this.handleMaskClick} />
        </If>
        <ChildWrapper>{children}</ChildWrapper>
      </Portal>
    )
  }
}

export default Modal
