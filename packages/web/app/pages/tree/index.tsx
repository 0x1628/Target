import * as React from 'react'
import TreeContainer, {Tree} from 'shared/containers/TreeContainer'
import TaskItem from '../../components/TaskItem'
import {TreeWrapper} from './styled-tree'

interface TreeIndexProps {
  tree: Tree
}

class TreeIndex extends React.Component<TreeIndexProps> {
  render() {
    const {tree} = this.props
    return (
      <TreeWrapper>
        {tree.sorted.map(node => (
          <TaskItem task={node} key={node.id} />
        ))}
        <hr />
        <div>Inbox</div>
        <div>
          {tree.unsorted.map(task => (
            <TaskItem task={task} key={task.id} />
          ))}
        </div>
      </TreeWrapper>
    )
  }
}

export default function() {
  return (
    <TreeContainer>
      {({tree}) => (
        <TreeIndex tree={tree} />
      )}
    </TreeContainer>
  )
}
