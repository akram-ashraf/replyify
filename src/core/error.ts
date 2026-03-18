import { INTERNAL_ERROR } from "./codes"
import { getStatus } from "./status"
import type { ApiErrorShape } from "./types"

export class ApiError extends Error implements ApiErrorShape {
  code: string
  status: number
  errors?: any[]
  meta?: Record<string, any>

  constructor(
    code: string,
    message: string,
    errors?: any[],
    meta?: Record<string, any>
  ) {
    const resolvedCode = code || INTERNAL_ERROR
    const resolvedMessage = message || "Internal error"

    super(resolvedMessage)

    Object.setPrototypeOf(this, ApiError.prototype)

    this.name = "ApiError"
    this.code = resolvedCode
    this.message = resolvedMessage
    this.errors = errors
    this.meta = meta
    this.status = getStatus(resolvedCode)
  }
}
