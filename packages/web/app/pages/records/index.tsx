import * as React from 'react'
import RecordContainer from 'shared/containers/RecordContainer'
import {getSpDate} from 'shared/utils'
import {FunctionEasyReactRouterComponent} from '../../easy-react-router/index'
import DateSign from '../../components/DateSign'
import NavBar from '../../components/NavBar'
import Tasks from './Tasks'

const RecordsIndex: FunctionEasyReactRouterComponent = ({query}) => {
  const currentDate = query.id || getSpDate()

  return <RecordContainer date={currentDate}>
    {({tasks, actions}) => (
      <>
        <DateSign date={currentDate} />
        <Tasks tasks={tasks} />
        <NavBar onAdd={actions.addTask} addParams={{endDate: currentDate}}></NavBar>
      </>
    )}
  </RecordContainer>
}

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

export default RecordsIndex
