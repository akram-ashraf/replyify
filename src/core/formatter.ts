import type { ErrorReply, ReplyResult, SuccessReply } from "./types"

export function formatReply(
  result: ReplyResult
): SuccessReply<any> | ErrorReply {
  try {
    if (result.type === "success" || result.type === "pagination") {
      return {
        success: true,
        code: result.code,
        message: result.message ?? "Success",
        data: result.data,
        meta: result.meta,
      }
    }

    if (result.type === "error") {
      return {
        success: false,
        code: result.code,
        message: result.message ?? "Error",
        errors: result.errors,
        meta: result.meta,
      }
    }

    return {
      success: false,
      code: "INTERNAL_ERROR",
      message: "Invalid reply result",
      errors: [],
    }
  } catch {
    return {
      success: false,
      code: "INTERNAL_ERROR",
      message: "Invalid reply result",
      errors: [],
    }
  }
}
