import * as React from 'react'
import {CallbackArguments} from 'shared/containers/RecordContainer'
import {Task} from 'shared/models/Task'
import If from 'shared/components/If'
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
        <div>
          <Button>Menu</Button>
          {children}
          <Button onClick={this.handleAdd}>Add</Button>
        </div>
        <If value={showAddModal}>
          <Modal unmountDelay={2000} onRequestClose={this.handleCloseAdd}>this is modal</Modal>
        </If>
      </>
    )
  }
}

export default NavBar
