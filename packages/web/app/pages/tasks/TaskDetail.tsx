import * as React from 'react'
import styled from 'shared/styled'
import {Task} from 'shared/models/Task'
import {title} from 'shared/styled/elements'
import Editable from '../../components/Editable'

interface TaskDetailProps {
  task: Task
}

const TaskDetailWrapper = styled.div`

  & .title {
    ${title};
  }
`

class TaskDetail extends React.Component<TaskDetailProps> {
  render() {
    const {task} = this.props
    return (
      <TaskDetailWrapper>
        <Editable readOnly className="title" defaultValue={task.title} />
      </TaskDetailWrapper>
    )
  }
}

export default TaskDetail
