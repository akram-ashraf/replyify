import { describe, expect, it } from "vitest"

import { ApiError, apiError, fail, ok, paginate, validationError } from "../src/index"

describe("reply", () => {
  it("returns a success reply from ok()", () => {
    expect(ok({ id: 1 }, "Done", { requestId: "req_1" })).toEqual({
      type: "success",
      code: "OK",
      message: "Done",
      data: { id: 1 },
      meta: { requestId: "req_1" },
    })
  })

  it("returns an error reply from fail()", () => {
    expect(
      fail("NOT_FOUND", "User not found", [{ field: "id", message: "Missing" }], {
        requestId: "req_2",
      })
    ).toEqual({
      type: "error",
      code: "NOT_FOUND",
      message: "User not found",
      errors: [{ field: "id", message: "Missing" }],
      meta: { requestId: "req_2" },
    })
  })

  it("returns a pagination reply from paginate()", () => {
    expect(
      paginate([{ id: 1 }], {
        page: 2,
        limit: 10,
        total: 25,
        message: "Listed",
        meta: { requestId: "req_3" },
      })
    ).toEqual({
      type: "pagination",
      code: "OK",
      message: "Listed",
      data: [{ id: 1 }],
      meta: {
        page: 2,
        limit: 10,
        total: 25,
        pages: 3,
        requestId: "req_3",
      },
    })
  })

  it("returns a validation error reply from validationError()", () => {
    expect(
      validationError([{ field: "name", message: "Required" }], "Invalid input")
    ).toEqual({
      type: "error",
      code: "VALIDATION_ERROR",
      message: "Invalid input",
      errors: [{ field: "name", message: "Required" }],
      meta: undefined,
    })
  })

  it("returns an ApiError instance from apiError()", () => {
    const err = apiError("NOT_FOUND", "User not found", [{ field: "id", message: "Missing" }], {
      requestId: "req_4",
    })

    expect(err).toBeInstanceOf(ApiError)
    expect(err.code).toBe("NOT_FOUND")
    expect(err.status).toBe(404)
    expect(err.message).toBe("User not found")
    expect(err.errors).toEqual([{ field: "id", message: "Missing" }])
    expect(err.meta).toEqual({ requestId: "req_4" })
  })
})
