import * as React from 'react'
import TaskContainer from 'shared/containers/TaskContainer'
import If from 'shared/lang/If'
import {EasyReactRouterComponent} from '../../easy-react-router'
import NavBar from '../../components/NavBar'
import TaskDetail from './TaskDetail'

class TaskIndex extends EasyReactRouterComponent {
  render() {
    const id = this.props.path![0]
    return (
      <TaskContainer id={id}>
        {({task, actions}) => (
          <If value={task}>
            <TaskDetail task={task!} />
            <NavBar onAdd={actions.addTask} addParams={{parentId: task!.id}} />
          </If>
        )}
      </TaskContainer>
    )
  }
}

TaskIndex.enterAnim = 'hello-world'

export default TaskIndex
