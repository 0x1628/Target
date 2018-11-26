import {Operations, List} from './index'
import {Base} from '../models/Base'
import {memorify} from './memory'

const operations: Operations<Promise<any>> = {
  async add(table, data) {
    const dbData = await operations.list(table)
    dbData.data.push(data)
    dbData.meta.last = dbData.meta.last + 1
    localStorage.setItem(table, JSON.stringify(dbData))
    return data
  },
  async delete(table, data) {
    const dbData = await operations.list(table)
    dbData.data = dbData.data.filter(i => i.id === data.id)
    dbData.meta.last = dbData.meta.last - 1
    localStorage.setItem(table, JSON.stringify(dbData))
    return true
  },
  async modify(table, data) {
    const dbData = await operations.list(table)
    let result: Base
    dbData.data = dbData.data.map(i => {
      if (i.id === data.id) {
        result = {
          ...i,
          ...data,
        }
        return result
      }
      return i
    })
    localStorage.setItem(table, JSON.stringify(dbData))
    return result!
  },
  async list(table) {
    const dbDataString = localStorage.getItem(table)
    let dbData: List
    if (dbDataString) {
      try {
        dbData = JSON.parse(dbDataString)
      } catch (e) {
        // Todo
        // something bad happend
        throw new Error(e)
      }
    } else {
      dbData = {
        data: [],
        meta: {last: 1},
      }
    }
    return dbData
  },
  async findById(table, id) {
    const dbData = await operations.list(table)
    const index = dbData.data.findIndex(i => i.id === id)
    return {index, target: dbData.data[index]}
  },
  async init(table) {
    return operations.list(table)
  },
}

export default memorify(operations)
