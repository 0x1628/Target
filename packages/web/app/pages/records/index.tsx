import * as React from 'react'
import RecordContainer, {CallbackArguments} from 'shared/containers/RecordContainer'
import {getSpDate} from 'shared/utils'
import {EasyReactRouterComponentProps} from '../../easy-react-router'
import DateSign from '../../components/DateSign'
import NavBar from '../../components/NavBar'

interface TasksProps {
  tasks: CallbackArguments['tasks']
  onAdd: CallbackArguments['actions']['addTask'],
}

const Tasks: React.SFC<TasksProps> = ({tasks, onAdd}) => {
  return (
    <div onClick={() => onAdd({title: 'haha'})}>{tasks.length}Click</div>
  )
}

const RecordsIndex: React.SFC<EasyReactRouterComponentProps> = ({path}) => {
  const currentDate = path ? path[0] : getSpDate()

  return <RecordContainer date={currentDate}>
    {({tasks, actions}) => (
      <>
        <DateSign date={currentDate} />
        <Tasks tasks={tasks} onAdd={actions.addTask} />
        <NavBar onAdd={actions.addTask} addParams={{endDate: currentDate}}></NavBar>
      </>
    )}
  </RecordContainer>
}

export default RecordsIndex
