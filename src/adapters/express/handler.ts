import { formatReply } from "../../core/formatter"
import { normalizeError } from "../../core/normalize"
import { getStatus } from "../../core/status"
import type { ReplyResult } from "../../core/types"

export function replyHandler(
  fn: (req: any, res: any, next: any) => any | Promise<any>
) {
  return async function (req: any, res: any, next: any) {
    try {
      const result = (await fn(req, res, next)) as ReplyResult | undefined

      if (!result) {
        return
      }

      const formatted = formatReply(result)
      const status = getStatus(formatted.code)

      res.status(status).json(formatted)
    } catch (err) {
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
}
