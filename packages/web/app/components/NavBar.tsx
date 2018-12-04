import * as React from 'react'
import {CallbackArguments} from 'shared/containers/RecordContainer'
import {Task} from 'shared/models/Task'
import If from 'shared/lang/If'
import styled from 'shared/styled'
import Icon from 'shared/elements/Icon'
import Modal from './Modal'
import Button from './Button'
import TaskAddDialog from './TaskAddDialog'

type AddParams = {
  parentId?: Task['parentId'],
  endDate?: Task['endDate'],
}

interface NavBarProps {
  onAdd?: CallbackArguments['actions']['addTask']
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
  height: ${props => props.theme.navbarHeight};
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

  handleShowAdd = (e: React.MouseEvent) => {
    this.setState({showAddModal: true})
  }

  handleCloseAdd = () => {
    this.setState({showAddModal: false})
  }

  handleAdd = (data: Partial<Task>) => {
    const {addParams, onAdd} = this.props
    onAdd!({
      ...data,
      ...addParams,
    })
    this.handleCloseAdd()
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
            onClick={this.handleShowAdd}
            className="add-button"
            aria-label="add"
          >
            <Icon name="plus" />
          </Button>
        </NavBarWrapper>
        <Modal
          isOpen={showAddModal}
          shouldCloseOnMaskClick={true}
          unmountDelay={Modal.transitionDuration}
          onRequestClose={this.handleCloseAdd}
        >
          <TaskAddDialog
            onRequestClose={this.handleCloseAdd}
            onSubmit={this.handleAdd}
          />
        </Modal>
      </>
    )
  }
}

const NavBarWithContext: React.FunctionComponent<NavBarProps> = (
  {onAdd: propOnAdd, addParams: propAddParams},
) => {
  return (
    <NavBarContext.Consumer>
      {({onAdd, addParams}) => (
        <NavBar onAdd={propOnAdd || onAdd} addParams={propAddParams || addParams} />
      )}
    </NavBarContext.Consumer>
  )
}

export default NavBarWithContext

export interface NavBarContextValue {
  key: string,
  addParams?: AddParams,
  onAdd?: CallbackArguments['actions']['addTask'],
  update(value: Pick<NavBarContextValue, Exclude<keyof NavBarContextValue, 'update'>>): void
}

const NavBarContext = React.createContext<NavBarContextValue>({
  key: '',
  update() { /**/ },
})

export {NavBarContext}
