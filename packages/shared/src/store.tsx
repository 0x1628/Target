import * as React from 'react'
import {createStore, compose, applyMiddleware, Store} from 'redux'
import {Provider} from 'react-redux'
import {createRootReducer} from './redux'

const middlewares: any[] = []

let store: Store

function finalCreateStore(preloadedState: any, isDebug = false): Store {
  let enhancer = null

  if (isDebug && (global as any).devToolsExtension) {
    enhancer = compose(applyMiddleware(...middlewares), (global as any).devToolsExtension())
  } else {
    enhancer = applyMiddleware(...middlewares)
  }
  const rootReducer = createRootReducer()

  type test = typeof rootReducer
  store = createStore(rootReducer, preloadedState, enhancer)
  return store
}

export function init(isDebug?: boolean) {
  store = finalCreateStore({}, isDebug)

  return store
}

type CreateRoot = (preloadedState?: any, isDebug?: boolean) => React.ComponentClass

export const createRoot: CreateRoot = (preloadedState = {}, isDebug = false) => {
  const targetStore = init(isDebug)

  class Root extends React.Component {
    render() {
      return (
        <Provider store={targetStore}>
          {this.props.children}
        </Provider>
      )
    }
  }
  return Root
}
