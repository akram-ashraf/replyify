import { describe, expect, it } from "vitest"

import { getStatus } from "../src/core/status"

describe("getStatus", () => {
  it("returns 200 for OK", () => {
    expect(getStatus("OK")).toBe(200)
  })

  it("returns 404 for NOT_FOUND", () => {
    expect(getStatus("NOT_FOUND")).toBe(404)
  })

  it("returns 500 for unknown codes", () => {
    expect(getStatus("UNKNOWN")).toBe(500)
  })
})
