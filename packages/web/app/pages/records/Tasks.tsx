import * as React from 'react'
import {CallbackArguments} from 'shared/containers/RecordContainer'
import styled from 'shared/styled'
import TaskItem from '../../components/TaskItem'

interface TasksProps {
  tasks: CallbackArguments['tasks']
}

const TasksWrapper = styled.div`
  flex: 1;
  margin: 40px ${props => `${props.theme.horizontalPadding} ${props.theme.navbarHeight}`};
`

const Tasks: React.FunctionComponent<TasksProps> = ({tasks}) => {
  return (
    <TasksWrapper>
      {tasks.map(task => (
        <TaskItem task={task} key={task.id} />
      ))}
    </TasksWrapper>
  )
}

export default Tasks
