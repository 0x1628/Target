import {Middleware} from 'redux'
import {update} from '../db/index'

declare namespace global {
  type idleHandler = any | null
  type idleCallback = (idleDeadline: any) => void
  function requestIdleCallback(callback: idleCallback): idleHandler
  function cancelIdleCallback(handle: idleHandler): void
}

let idleHandler: global.idleHandler = null
const localdb: Middleware = store => next => action => {
  const result = next(action)

  if (idleHandler) {
    global.cancelIdleCallback(idleHandler)
  }

  const data = store.getState()
  idleHandler = global.requestIdleCallback(() => {
    const [table, method] = result.type.split(':')
    update(table, method, result.payload)
  })
  return result
}

export default localdb
