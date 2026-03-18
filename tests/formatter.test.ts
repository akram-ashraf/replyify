import { describe, expect, it } from "vitest"

import { formatReply } from "../src/core/formatter"
import { fail, ok, paginate } from "../src/index"

describe("formatReply", () => {
  it("formats success replies with success=true", () => {
    expect(formatReply(ok({ id: 1 }, "Done", { requestId: "req_1" }))).toEqual({
      success: true,
      code: "OK",
      message: "Done",
      data: { id: 1 },
      meta: { requestId: "req_1" },
    })
  })

  it("formats error replies with success=false", () => {
    expect(
      formatReply(
        fail("BAD_REQUEST", "Invalid request", [{ field: "name", message: "Required" }], {
          requestId: "req_2",
        })
      )
    ).toEqual({
      success: false,
      code: "BAD_REQUEST",
      message: "Invalid request",
      errors: [{ field: "name", message: "Required" }],
      meta: { requestId: "req_2" },
    })
  })

  it("formats pagination replies with success=true", () => {
    expect(
      formatReply(
        paginate([{ id: 1 }], {
          page: 1,
          limit: 10,
          total: 15,
          meta: { requestId: "req_3" },
        })
      )
    ).toEqual({
      success: true,
      code: "OK",
      message: "Success",
      data: [{ id: 1 }],
      meta: {
        page: 1,
        limit: 10,
        total: 15,
        pages: 2,
        requestId: "req_3",
      },
    })
  })
})
