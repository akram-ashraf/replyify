export type ReplyResult<T = any> = {
  type: "success" | "error" | "pagination"
  code: string
  message?: string
  data?: T
  errors?: any[]
  meta?: Record<string, any>
}

export type SuccessReply<T> = {
  success: true
  code: string
  message: string
  data: T
  meta?: Record<string, any>
}

export type ErrorReply = {
  success: false
  code: string
  message: string
  errors?: any[]
  meta?: Record<string, any>
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  pages: number
}

export type ApiErrorShape = {
  code: string
  status: number
  message: string
  errors?: any[]
  meta?: Record<string, any>
}
