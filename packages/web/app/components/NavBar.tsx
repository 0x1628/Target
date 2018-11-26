import * as React from 'react'
import {CallbackArguments} from 'shared/containers/RecordContainer'
import {Task} from 'shared/models/Task'
import Dialog from './Dialog'
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

class NavBar extends React.Component<NavBarProps> {

  handleAdd = (e: React.MouseEvent) => {
    //
  }

  render() {
    const {children} = this.props
    return (
      <>
        <div>
          <Button>Menu</Button>
          {children}
          <Button onClick={this.handleAdd}>Add</Button>
        </div>
        <Dialog>test</Dialog>
      </>
    )
  }
}

export default NavBar
