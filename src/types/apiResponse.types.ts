export interface IApiResponse<T> {
  statusCode: number
  success: boolean
  message: string
  meta?: Meta
  data: T[]
}

export interface Meta {
  page: number
  limit: number
  total: number
  totalPages: number
}


export interface IApiErrorResponse {
  status: number
  data: IERROR
}

export interface IERROR {
  success: boolean
  message: string
  // errorSources: any[]
  err: Err
  stack: string
}

export interface Err {
  name: string
  message: string
}