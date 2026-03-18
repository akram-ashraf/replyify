import { describe, expect, it } from "vitest"

import { ApiError } from "../src/core/error"
import { normalizeError } from "../src/core/normalize"

describe("ApiError", () => {
  it("maps NOT_FOUND to status 404", () => {
    const err = new ApiError("NOT_FOUND", "User not found")

    expect(err.code).toBe("NOT_FOUND")
    expect(err.status).toBe(404)
    expect(err.message).toBe("User not found")
  })

  it("maps unknown codes to status 500", () => {
    const err = new ApiError("UNKNOWN_CODE", "Unexpected error")

    expect(err.code).toBe("UNKNOWN_CODE")
    expect(err.status).toBe(500)
    expect(err.message).toBe("Unexpected error")
  })
})

describe("normalizeError", () => {
  it("wraps native Error into ApiError", () => {
    const err = normalizeError(new Error("boom"))

    expect(err).toBeInstanceOf(ApiError)
    expect(err.code).toBe("INTERNAL_ERROR")
    expect(err.status).toBe(500)
    expect(err.message).toBe("boom")
  })

  it("wraps string into ApiError", () => {
    const err = normalizeError("broken")

    expect(err).toBeInstanceOf(ApiError)
    expect(err.code).toBe("INTERNAL_ERROR")
    expect(err.status).toBe(500)
    expect(err.message).toBe("broken")
  })

  it("returns the same ApiError instance", () => {
    const original = new ApiError("CONFLICT", "Already exists")

    expect(normalizeError(original)).toBe(original)
  })
})
