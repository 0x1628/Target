import * as React from 'react'
import {createStore, compose, applyMiddleware, Store} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {createRootReducer} from './redux'

const middlewares: any[] = [thunk]

let store: Store

function finalCreateStore(preloadedState: any, isDebug = false): Store {
  let enhancer = null
  if (isDebug && (global as any).__REDUX_DEVTOOLS_EXTENSION__ ) {
    enhancer = compose(applyMiddleware(...middlewares), (global as any).__REDUX_DEVTOOLS_EXTENSION__())
  } else {
    enhancer = applyMiddleware(...middlewares)
  }
  const rootReducer = createRootReducer()

  type test = typeof rootReducer
  store = createStore(rootReducer, preloadedState, enhancer)
  return store
}

export function init(preloadedState?: any, isDebug?: boolean) {
  store = finalCreateStore(preloadedState, isDebug)

  return store
}

type CreateRoot = (preloadedState?: any, isDebug?: boolean) => React.ComponentClass

export const createRoot: CreateRoot = (preloadedState = {}, isDebug = false) => {
  const targetStore = init(preloadedState, isDebug)

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
