import { OK, VALIDATION_ERROR, INTERNAL_ERROR } from "./codes"
import { ApiError } from "./error"
import { buildPaginationMeta } from "./pagination"
import type { ReplyResult } from "./types"

export function ok<T>(
  data: T,
  message?: string,
  meta?: Record<string, any>
): ReplyResult<T> {
  return {
    type: "success",
    code: OK,
    message: message ?? "Success",
    data,
    meta,
  }
}

export function fail(
  code: string,
  message: string,
  errors?: any[],
  meta?: Record<string, any>
): ReplyResult {
  return {
    type: "error",
    code,
    message,
    errors,
    meta,
  }
}

export function apiError(
  code: string,
  message: string,
  errors?: any[],
  meta?: Record<string, any>
): ApiError {
  try {
    return new ApiError(code, message, errors, meta)
  } catch {
    return new ApiError(INTERNAL_ERROR, message || "Internal error", errors, meta)
  }
}

export function validationError(
  errors: { field: string; message: string }[],
  message?: string
): ReplyResult {
  return fail(VALIDATION_ERROR, message ?? "Validation failed", errors)
}

export function paginate<T>(
  data: T[],
  options: {
    page: number
    limit: number
    total: number
    message?: string
    meta?: Record<string, any>
  }
): ReplyResult<T[]> {
  const metaFromPagination = buildPaginationMeta(
    options.page,
    options.limit,
    options.total
  )

  const mergedMeta = {
    ...metaFromPagination,
    ...options.meta,
  }

  return {
    type: "pagination",
    code: OK,
    message: options.message ?? "Success",
    data,
    meta: mergedMeta,
  }
}
