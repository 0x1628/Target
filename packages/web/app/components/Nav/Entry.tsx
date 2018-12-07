import * as React from 'react'
import {CallbackArguments} from 'shared/containers/RecordContainer'
import {Task} from 'shared/models/Task'
import styled from 'shared/styled'
import Icon from 'shared/elements/Icon'
import Modal from '../Modal'
import Button from '../Button'
import TaskAddDialog from '../TaskAddDialog'

export type AddParams = {
  parentId?: Task['parentId'],
  endDate?: Task['endDate'],
}

export interface EntryProps {
  onAdd?: CallbackArguments['actions']['addTask']
  addParams?: AddParams
  children?: JSX.Element
  onMenuClick(): void
}

interface EntryState {
  showAddModal: boolean
}

const EntryWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  height: ${props => props.theme.bottomBarHeight};
  align-items: center;
  padding: 0 ${props => props.theme.horizontalPadding};
  background: #f8f8f8;
  z-index: ${props => props.theme.zIndexPortal - 100};

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

const EntryCenterWrapper = styled.div`
flex: 1;
`

export class Entry extends React.Component<EntryProps, EntryState> {

  state: EntryState = {showAddModal: false}

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
    const {children, onMenuClick} = this.props
    const {showAddModal} = this.state

    return (
      <>
        <EntryWrapper>
          <Button
            preset="plain"
            aria-label="menu"
            className="menu-button"
            onClick={onMenuClick}
          >
            <Icon name="menu" />
          </Button>
          <EntryCenterWrapper>{children}</EntryCenterWrapper>
          <Button
            preset="circle"
            onClick={this.handleShowAdd}
            className="add-button"
            aria-label="add"
          >
            <Icon name="plus" />
          </Button>
        </EntryWrapper>
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
