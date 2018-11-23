import { Operations } from './index'

const operations: Operations = {
  add(table, data) {
    let dbData: any = localStorage.getItem(table)
    if (!dbData) {
      dbData = []
    } else {
      try {
        dbData = JSON.parse(dbData)
      } catch (e) {
        // Todo
        // something bad happend
        console.error(e)
      }
    }
    dbData.push(data)
    localStorage.setItem(table, JSON.stringify(dbData))
  },
  delete(table, data) {
    return true
  },
  modify(table, data) {
    return data
  },
}

export default operations
