import * as React from 'react'
import styled from 'shared/styled'
import {Task} from 'shared/models/Task'
import {title} from 'shared/styled/elements'
import If from 'shared/components/If'
import {Link} from '../../easy-react-router/Link'
import Editable from '../../components/Editable'
import TaskItem from '../../components/TaskItem'

interface TaskDetailProps {
  task: Task
  subTasks: Task[]
  parentTasks: Task[]
}

const TaskDetailWrapper = styled.div`
  & .title {
    ${title};
  }
`

const SubTaskWrapper = styled.div`
  margin: 20px ${props => props.theme.horizontalPadding};
`

class TaskDetail extends React.Component<TaskDetailProps> {
  render() {
    const {task, subTasks, parentTasks} = this.props

    return (
      <TaskDetailWrapper>
        <Editable readOnly className="title" defaultValue={task.title} />
        <If value={parentTasks.length}>
          <div>
            {parentTasks.map(pt => (
              <React.Fragment key={pt.id}>
                &gt;&nbsp;
                <Link href={`/tasks/${pt.id}`}>{pt.title}</Link>
              </React.Fragment>
            ))}
          </div>
        </If>
        <If value={subTasks.length}>
          <SubTaskWrapper>
            {subTasks.map(st => (
              <TaskItem task={st} key={st.id} />
            ))}
          </SubTaskWrapper>
        </If>
      </TaskDetailWrapper>
    )
  }
}

export default TaskDetail
