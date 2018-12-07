import {Operations, List} from './index'
import {Base} from '../models/Base'

const memoryCache: {[key: string]: List} = {}

// TODO when real operation failed, throw error to user and reset inmemory cache
export function memorify(operations: Operations<Promise<any>>): Operations<null> {
  function ensure(table: string) {
    if (!memoryCache[table]) {
      throw new Error('Not initialized')
    }
    return true
  }

  const resultOperations: Operations<null> = {
    add(table, data) {
      ensure(table)
      const list = memoryCache[table]
      list.data = list.data.concat(data)
      list.meta = {
        ...list.meta,
        last: list.meta.last + 1,
      }
      operations.save ? operations.save(table, list)
        : operations.add(table, data)
      return data
    },
    modify(table, data) {
      ensure(table)
      const {target, index} = resultOperations.findById(table, data.id!)
      const list = memoryCache[table]
      const newItem: Base = {
        ...target!,
        ...data,
      }
      list.data = list.data.slice(0, index).concat(newItem).concat(list.data.slice(index + 1))
      operations.save ? operations.save(table, list)
        : operations.modify(table, data)
      return newItem
    },
    delete(table, data) {
      ensure(table)
      const {target, index} = resultOperations.findById(table, data.id)
      const list = memoryCache[table]
      list.data = list.data.slice(0, index).concat(list.data.slice(index + 1))
      list.meta = {
        ...list.meta,
        last: list.meta.last - 1,
      }
      operations.save ? operations.save(table, list)
        : operations.delete(table, data)
      return true
    },
    list(table) {
      ensure(table)
      /* need or not?
      operations.list(table).then(res => {
        memoryCache[table] = res
      }) */
      return memoryCache[table]
    },
    findById(table, id, {strict} = {strict: true}) {
      ensure(table)
      const list = memoryCache[table]
      let index = -1
      let target: Base | null = null
      list.data.some((item, i) => {
        if (item.id === id) {
          index = i
          target = item
          return true
        }
        return false
      })
      if (!target && strict) {
        throw new Error(`Can't find data ${id} in table ${table}`)
      }
      return {target: target!, index}
    },
    async init(table) {
      memoryCache[table] = await operations.init(table)
      return memoryCache[table]
    },
  }

  return resultOperations
}
