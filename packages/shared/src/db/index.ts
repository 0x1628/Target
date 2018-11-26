import {Task} from '../models/Task'
import {Base} from '../models/Base'

enum Tables {
  'tasks',
  'todo',
}

export type ListMeta = {
  last: number;
}

export type List<T = Base> = {
  data: T[];
  meta: ListMeta;
}

type OperationReturn<T, E = any> = T extends Promise<any> ? Promise<E> : E
export type Operations<T> = {
  add(table: string, data: Base, options?: any): OperationReturn<T, Base>;
  delete(table: string, data: Base, options?: any): OperationReturn<T, boolean>;
  modify(table: string, data: Partial<Base>, options?: any): OperationReturn<T, Base>;
  list(table: string, options?: any): OperationReturn<T, List<any>>;
  findById(table: string, id: Base['id'], options?: any): OperationReturn<T, {target: Base, index: number}>;
  init(table: string): Promise<List>
}

type Data = Task // TODO

const host = 'web' // TODO
let hostOperations: Operations<null>

export function execSyncWithFullResult<T>(
  method: keyof Operations<any>, tableName: keyof typeof Tables, ...args: any[]): List<T> {
  const m: any = hostOperations[method]
  m(tableName, ...args)
  return hostOperations.list(tableName)
}

export async function init() {
  const m = await import(`./${host}`)
  hostOperations = m.default
  const tables = Object.keys(Tables).filter(k => typeof (Tables as any)[k] === 'number')
  return Promise.all(tables.map(table => hostOperations.init(table)))
    .then(res => {
      return tables.reduce((next, table, index) => {
        next[table] = res[index]
        return next
      }, {} as any)
    })
}
