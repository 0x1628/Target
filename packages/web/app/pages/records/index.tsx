import * as React from 'react'
import RecordContainer, {CallbackArguments} from 'shared/containers/RecordContainer'
import {getSpDate} from 'shared/utils'
import {EasyReactRouterComponent} from 'easy-react-router'
import DateSign from '../../components/DateSign'
import {NavContextUpdater} from '../../components/Nav'
import Tasks from './Tasks'

interface RecordsIndexProps {
  test: string,
}

interface UpdaterProps {
  onAdd: any
  addParams: any
  update: any
}
class Updater extends React.Component<UpdaterProps> {
  componentDidMount() {
    const {onAdd, addParams, update} = this.props
    update({
      key: `recordsinxe-${JSON.stringify(addParams)}`,
      addParams,
      onAdd,
    })
  }

  render() {
    return null
  }
}

class RecordsIndex extends EasyReactRouterComponent<RecordsIndexProps> {
  currentDate!: string

  render() {
    const currentDate = this.props.query.id || getSpDate()

    return <RecordContainer date={currentDate}>
      {({tasks, actions}) => (
        <>
          <DateSign date={currentDate} />
          <Tasks tasks={tasks} />
          <NavContextUpdater
            id={`recordsindex-${currentDate}`}
            addParams={{endDate: currentDate}}
            onAdd={actions.addTask}
          />
        </>
      )}
    </RecordContainer>
  }
}

/*
RecordsIndex.exitAnim = (node) => {
  return new Promise(resolve => {
    node.classList.add('exitanim')
    requestAnimationFrame(() => {
      node.addEventListener('transitionend', () => {
        resolve()
      })
      node.classList.add('exitanim--active')
    })
  })
}

RecordsIndex.popEnterAnim = (node) => {
  return new Promise(resolve => {
    node.classList.add('popenteranim')
    requestAnimationFrame(() => {
      node.addEventListener('transitionend', () => {
        resolve()
      })
      node.classList.add('popenteranim--active')
    })
  })
}
*/

export default RecordsIndex
