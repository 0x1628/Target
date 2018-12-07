import * as React from 'react'
import {Entry, EntryProps, AddParams} from './Entry'
import {Sidebar} from './Sidebar'

interface NavState {
  showSidebar: boolean
}
interface NavProps {
  onAdd?: EntryProps['onAdd']
  addParams?: EntryProps['addParams']
}
export default class Nav extends React.Component<NavProps, NavState> {
  state = {showSidebar: false}

  handleEntryMenuClick = () => {
    this.setState({
      showSidebar: true,
    })
  }

  handleSidebarClose = () => {
    this.setState({
      showSidebar: false,
    })
  }

  render() {
    const {onAdd: propOnAdd, addParams: propAddParams} = this.props
    const {showSidebar} = this.state
    return (
      <>
        <NavContext.Consumer>
          {({onAdd, addParams}) => (
            <Entry
              onAdd={propOnAdd || onAdd}
              addParams={propAddParams || addParams}
              onMenuClick={this.handleEntryMenuClick}
            />
          )}
        </NavContext.Consumer>
        <Sidebar isShow={showSidebar} onRequestClose={this.handleSidebarClose} />
      </>
    )
  }
}

export interface NavContextValue {
  key: string,
  addParams?: AddParams,
  onAdd?: EntryProps['onAdd'],
  update(value: Pick<NavContextValue, Exclude<keyof NavContextValue, 'update'>>): void
}

export const NavContext = React.createContext<NavContextValue>({
  key: '',
  update() { /**/ },
})

interface NavUpdaterProps {
  id: string,
  addParams?: NavContextValue['addParams'],
  onAdd?: NavContextValue['onAdd'],
  update: NavContextValue['update']
}

type NavContextUpdaterProps = Pick<NavUpdaterProps, Exclude<keyof NavUpdaterProps, 'update'>>

class NavUpdater extends React.Component<NavUpdaterProps> {
  componentDidMount() {
    this.update()
  }

  componentDidUpdate(prevProps: NavContextUpdaterProps) {
    if (this.props.id !== prevProps.id) {
      this.update()
    }
  }

  update() {
    const {addParams, onAdd, id, update} = this.props
    update({
      key: id,
      addParams,
      onAdd,
    })
  }

  render() {
    return null
  }
}

export function NavContextUpdater(props: NavContextUpdaterProps) {
  return (
    <NavContext.Consumer>
      {({update}) => (
        <NavUpdater {...props} update={update} />
      )}
    </NavContext.Consumer>
  )
}
