import { formatReply } from "../../core/formatter"
import { normalizeError } from "../../core/normalize"
import { getStatus } from "../../core/status"

export function errorMiddleware() {
  return function (err: any, req: any, res: any, next: any): void {
    const apiErr = normalizeError(err)
    const formatted = formatReply({
      type: "error",
      code: apiErr.code,
      message: apiErr.message,
      errors: apiErr.errors,
      meta: apiErr.meta,
    })
    const status = getStatus(apiErr.code)

    res.status(status).json(formatted)
  }
}
