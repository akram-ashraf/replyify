import { INTERNAL_ERROR } from "./codes"
import { ApiError } from "./error"

export function normalizeError(err: unknown): ApiError {
  try {
    if (err instanceof ApiError) {
      return err
    }

    if (err instanceof Error) {
      return new ApiError(INTERNAL_ERROR, err.message)
    }

    if (typeof err === "string") {
      return new ApiError(INTERNAL_ERROR, err)
    }

    return new ApiError(INTERNAL_ERROR, "Unknown error")
  } catch {
    return new ApiError(INTERNAL_ERROR, "Unknown error")
  }
}
