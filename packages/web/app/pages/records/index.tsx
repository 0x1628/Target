import * as React from 'react'
import RecordContainer from 'shared/containers/RecordContainer'
import {getSpDate} from 'shared/utils'
import {EasyReactRouterComponent, EasyReactRouterComponentProps} from '../../easy-react-router/index'
import DateSign from '../../components/DateSign'
import {NavBarContext, NavBarContextValue} from '../../components/NavBar'
import Tasks from './Tasks'

interface RecordsIndexProps {
  updateNavBarContext: NavBarContextValue['update'],
  test: string,
}

class RecordsIndex extends EasyReactRouterComponent<RecordsIndexProps> {
  componentDidMount() {
    console.log(this.props.updateNavBarContext)
  }

  render() {
    const currentDate = this.props.query.id || getSpDate()

    return <RecordContainer date={currentDate}>
      {({tasks, actions}) => (
        <>
          <DateSign date={currentDate} />
          <Tasks tasks={tasks} />
        </>
      )}
    </RecordContainer>
  }
}

RecordsIndex.exitAnim = (node) => {
  return new Promise(resolve => {
    node.classList.add('exitanim')
    requestAnimationFrame(() => {
      node.addEventListener('transitionend', () => {
        resolve()
      })
      node.classList.add('exitanim--active')
    })
  })
}

RecordsIndex.popEnterAnim = (node) => {
  return new Promise(resolve => {
    node.classList.add('popenteranim')
    requestAnimationFrame(() => {
      node.addEventListener('transitionend', () => {
        resolve()
      })
      node.classList.add('popenteranim--active')
    })
  })
}

type consumerMap<T> = (props: T) =>
  {[key: string]: T[keyof T]}
function mapContextToProps<T, P = any>(Consumer: React.Consumer<T>, map: consumerMap<T>) {
  return function (Component: React.ComponentClass<P>) {
    const MappedClass = React.forwardRef<typeof Component, P>((props, ref) => (
      <Consumer>
        {(context) => (
          <Component {...props} ref={ref} {...map(context)} />
        )}
      </Consumer>
    ))

    for (const i in Component) {
      if ((Component as object).hasOwnProperty(i)) {
        (MappedClass as any)[i] = (Component as any)[i]
      }
    }

    return MappedClass
  }
}

export default mapContextToProps<NavBarContextValue, RecordsIndexProps & EasyReactRouterComponentProps>(
  NavBarContext.Consumer, ({update}) => ({
  updateNavBarContext: update,
}))(RecordsIndex)
