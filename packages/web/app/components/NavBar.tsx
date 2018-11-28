import * as React from 'react'
import {CallbackArguments} from 'shared/containers/RecordContainer'
import {Task} from 'shared/models/Task'
import If from 'shared/lang/If'
import styled from 'shared/styled'
import Icon from 'shared/elements/Icon'
import Modal from './Modal'
import Button from './Button'

type AddParams = {
  parentId?: Task['parentId'],
  endDate?: Task['endDate'],
}

interface NavBarProps {
  onAdd: CallbackArguments['actions']['addTask']
  addParams?: AddParams
  children?: JSX.Element
}

interface NavBarState {
  showAddModal: boolean
}

const NavBarWrapper = styled.div`
position: fixed;
bottom: 0;
width: 100%;
flex-direction: row;
height: 44px;
align-items: center;
padding: 0 ${props => props.theme.horizontalPadding};
background: #f8f8f8;

& button {
  width: 28px;
  height: 28px;
  padding: 0;
}

& .add-button svg {
  width: 15px;
  height: 15px;
}

& .menu-button svg {
  width: 24px;
  height: 17px;
}
`

const NavBarCenterWrapper = styled.div`
flex: 1;
`

class NavBar extends React.Component<NavBarProps, NavBarState> {

  state: NavBarState = {showAddModal: false}

  handleAdd = (e: React.MouseEvent) => {
    this.setState({showAddModal: true})
  }

  handleCloseAdd = () => {
    this.setState({showAddModal: false})
  }

  render() {
    const {children} = this.props
    const {showAddModal} = this.state

    return (
      <>
        <NavBarWrapper>
          <Button
            preset="plain"
            aria-label="menu"
            className="menu-button"
          >
            <Icon name="menu" />
          </Button>
          <NavBarCenterWrapper>{children}</NavBarCenterWrapper>
          <Button
            preset="circle"
            onClick={this.handleAdd}
            className="add-button"
            aria-label="add"
          >
            <Icon name="plus" />
          </Button>
        </NavBarWrapper>
        <If value={showAddModal}>
          <Modal unmountDelay={2000} onRequestClose={this.handleCloseAdd}>this is modal</Modal>
        </If>
      </>
    )
  }
}

export default NavBar
