export type HttpRequest = {
  url: string
  method: HttpMethod
  headers?: any
  body?: any
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  unauthorized = 401,
  badRequest = 400,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}
