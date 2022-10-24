export type TQueryType = {
  token?: string
  [prop: string]: TAny
}

export type THaveCode = {
  code: number
  message: string
}

export type TParams = TDictObject<TAny> | undefined | null

export type TRequestType = 'get' | 'post'

export type THttpResponse<T = TAnyType> = {
  code: number
  message: string
  data: T | null
}
