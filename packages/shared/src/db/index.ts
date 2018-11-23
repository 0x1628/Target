import {Task} from '../models/Task'

const tables = ['tasks']

export type Operations = {
  add(table: string, data: Data): void;
  delete(table: string, data: Data): boolean;
  modify<T extends Partial<Data>>(table: string, data: T): T;
}

type Data = Task // TODO

const host = 'web' // TODO
const getOperations = async () => {
  const m = await import(`./${host}`)
  return m.default as Operations
}

export async function update(tableName: string, method: string, data: Task) {
  if (!tables.includes(tableName)) {
    throw new Error(`bad table ${tableName}`)
  }
  const hostOperations: any = await getOperations()
  hostOperations[method](tableName, data)
}
