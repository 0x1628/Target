import * as React from 'react'
import RecordContainer from 'shared/containers/RecordContainer'
import {getSpDate} from 'shared/utils'
import {FunctionEasyReactRouterComponent} from '../../easy-react-router'
import DateSign from '../../components/DateSign'
import NavBar from '../../components/NavBar'
import Tasks from './Tasks'

const RecordsIndex: FunctionEasyReactRouterComponent = ({path}) => {
  const currentDate = path ? path[0] : getSpDate()

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

RecordsIndex.exitAnim = 'hello-xxx'

export default RecordsIndex
