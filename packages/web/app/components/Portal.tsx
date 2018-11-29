import * as React from 'react'
import {createPortal} from 'react-dom'
import {UnmountProps} from 'shared/lang/index'
import styled from 'shared/styled'

// tslint:disable-next-line
export interface PortalProps extends UnmountProps {
  forwardedRef?: React.Ref<any>,
}

const Wrapper = styled.div`
position: absolute;
top: 0;
left: 0;
z-index: ${props => props.theme.zIndexPortal};
`

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
    const {children, forwardedRef} = this.props
    return createPortal((
      <Wrapper ref={forwardedRef}>
        {children}
      </Wrapper>), this.el)
  }
}

export default React.forwardRef<HTMLElement, PortalProps>(({children, ...rest}, ref?) => (
  <Portal {...rest} forwardedRef={ref}>{children}</Portal>
))
