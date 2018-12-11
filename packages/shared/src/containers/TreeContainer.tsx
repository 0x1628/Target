import * as React from 'react'
import {connect} from 'react-redux'
import {RootState} from '../redux'
import {Task} from '../models/Task'

interface CallbackArguments {
  tree: any
}

interface TreeContainerProps {
  children(arg: CallbackArguments): JSX.Element
}

interface TreeNode extends Task {
  children: TreeNode[]
}

export interface Tree {
  unsorted: Task[],
  sorted: TreeNode[],
  previouseKey: string,
}

function addChildren(node: TreeNode, tasks: Task[]): TreeNode {
  node.childrenIds.forEach(cid => {
    const task = tasks.find(t => t.id === cid)
    if (!task) {
      console.error('sth bad happend, id pairs is missing')
      return
    }
    const childNode = {...task, children: []}
    node.children.push(childNode)
    if (childNode.childrenIds.length) {
      addChildren(childNode, tasks)
    }
  })

  return node
}

class TreeContainer extends React.Component<TreeContainerProps & ReturnType<typeof mapStateToProps>> {
  cached: Tree | null = null

  makeTree(): Tree {
    const {tasks} = this.props

    const currentKey = tasks.map(t => t.id).join('.')
    if (this.cached) {
      // simple compare, if props tasks has any change, recalculate
      if (this.cached.previouseKey === currentKey) {
        return this.cached
      }
    }

    const unsorted: Tree['unsorted'] = tasks.filter(task => task.parentId === null)
    const sorted: Tree['sorted'] = tasks.filter(task => task.parentId === '0').map(task => ({...task, children: []}))
    const remainTasks = tasks.filter(task => task.parentId && task.parentId !== '0')

    sorted.forEach(node => addChildren(node, remainTasks))
    return {
      unsorted,
      sorted,
      previouseKey: currentKey,
    }
  }

  render() {
    const tree = this.makeTree()
    return this.props.children({tree})
  }
}

function mapStateToProps(state: RootState) {
  return {
    tasks: state.tasks.data,
  }
}

export default connect(mapStateToProps)(TreeContainer)
