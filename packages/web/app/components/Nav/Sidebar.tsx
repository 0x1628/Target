import * as React from 'react'
import styled, {createGlobalStyle} from 'shared/styled'
import Portal from '../Portal'
import {Link} from 'easy-react-router'

const duration = 400

const GlobalStyle = createGlobalStyle`
.sidebar--show--start #root {
  transition: transform ease-out ${duration / 1000}s;
}

.sidebar--show #root {
  transform: translateX(55vw);
  position: relative;
  box-shadow: 0 0 5px rgba(0, 0, 0, .4);
}

.sidebar--show--start #root::after {
  content: '';
  background: #fff;
  opacity: .2;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${props => props.theme.zIndexPortal - 80};
  transition: opacity ease-out ${duration / 1000}s;
}

.sidebar--show #root::after {
  opacity: .8;
}

`

const SidebarWrapper = styled.div`
  width: 55vw;
  height: 100vh;
  top: 0;
  transform: translateX(-55vw);
  position: absolute;
  background: #ccc;

  .sidebar--show--start & {
    transition: transform ease-out ${duration / 1000}s;
  }

  .sidebar--show & {
    transform: translateX(0);
  }
`

interface SidebarProps {
  isShow: boolean
  onRequestClose(): void
}

export class Sidebar extends React.Component<SidebarProps> {
  static showStartClassName = 'sidebar--show--start'
  static showClassName = 'sidebar--show'

  componentDidUpdate(prevProps: SidebarProps) {
    if (this.props.isShow && !prevProps.isShow) {
      this.show()
    }
  }

  componentWillUnmount() {
    const root = document.querySelector('#root')
    if (root) {
      root.removeEventListener('click', this.close)
    }
  }

  // Caution!
  // I think global classname must be added here
  // the most convience way
  show() {
    const targetClassList = document.body.classList
    targetClassList.add(Sidebar.showStartClassName)
    requestAnimationFrame(() => {
      targetClassList.add(Sidebar.showClassName)
    })
    document.querySelector('#root')!.addEventListener('click', this.close)
  }

  close = () => {
    const root = document.querySelector('#root')!
    root.removeEventListener('click', this.close)
    const targetClassList = document.body.classList
    setTimeout(() => {
      targetClassList.remove(Sidebar.showStartClassName)
    }, duration)
    targetClassList.remove(Sidebar.showClassName)

    this.props.onRequestClose()
  }

  handleLinkClick = () => {
    this.close()
  }

  render() {
    return <Portal ref={null}>
      <>
        <SidebarWrapper>
          <Link onClick={this.handleLinkClick} href="/">Schedule</Link>
          <Link onClick={this.handleLinkClick} href="/tree">Tree</Link>
        </SidebarWrapper>
        <GlobalStyle />
      </>
    </Portal>
  }
}
