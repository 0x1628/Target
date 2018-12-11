import * as React from 'react'
import TaskContainer from 'shared/containers/TaskContainer'
import If from 'shared/lang/If'
import {EasyReactRouterComponent} from 'easy-react-router'
import {NavContextUpdater} from '../../components/Nav'
import Back from '../../components/Back'
import TaskDetail from './TaskDetail'

class TaskIndex extends EasyReactRouterComponent {
  render() {
    const id = this.props.query.id
    if (!id) return null
    return (
      <TaskContainer id={id}>
        {({task, subTasks, parentTasks, actions}) => <>
          <Back />
          <If value={task}>
            <TaskDetail task={task!} subTasks={subTasks} parentTasks={parentTasks} />
            <NavContextUpdater
              id={`tasksindex-${id}`}
              addParams={{parentId: task!.id, endDate: task!.endDate}}
              onAdd={actions.addTask}
            />
          </If>
        </>}
      </TaskContainer>
    )
  }
}

TaskIndex.enterAnim = (node) => {
  return new Promise(resolve => {
    node.classList.add('enteranim')
    requestAnimationFrame(() => {
      node.addEventListener('transitionend', () => {
        resolve()
      })
      node.classList.add('enteranim--active')
    })
  })
}

TaskIndex.popExitAnim = (node) => {
  return new Promise(resolve => {
    node.classList.add('popexitanim')
    requestAnimationFrame(() => {
      node.addEventListener('transitionend', () => {
        resolve()
      })
      node.classList.add('popexitanim--active')
    })
  })
}

export default TaskIndex
