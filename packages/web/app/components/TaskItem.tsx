import * as React from 'react'
import styled from 'shared/styled'
import {Task} from 'shared/models/Task'
import {history} from '../easy-react-router'

interface TaskItemProps {
  task: Task
}

const TaskItemWrapper = styled.div`
  & .main-line {
    flex-direction: row;
    line-height: 1.4;
  }

  & .task-title {
    margin-left: 6px;
    font-weight: 600;
    font-size: 16px;
  }
`

const CheckBoxWrapper = styled.div`
  width: 11px;
  height: 11px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 3px;
  transform: translateY(7px);
`

class TaskItem extends React.Component<TaskItemProps> {
  handleClick = () => {
    const {task} = this.props
    history.push(`/tasks/${task.id}`)
  }

  render() {
    const {task} = this.props

    return (
      <TaskItemWrapper>
        <div className="main-line">
          <CheckBoxWrapper />
          <div className="task-title" onClick={this.handleClick}>{task.title}</div>
        </div>
      </TaskItemWrapper>
    )
  }
}

export default TaskItem
