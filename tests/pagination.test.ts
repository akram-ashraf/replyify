import { describe, expect, it } from "vitest"

import { buildPaginationMeta } from "../src/core/pagination"

describe("buildPaginationMeta", () => {
  it("builds pagination meta with ceil(total / limit)", () => {
    expect(buildPaginationMeta(1, 10, 95)).toEqual({
      page: 1,
      limit: 10,
      total: 95,
      pages: 10,
    })
  })

  it("returns pages=0 when total is 0", () => {
    expect(buildPaginationMeta(1, 10, 0)).toEqual({
      page: 1,
      limit: 10,
      total: 0,
      pages: 0,
    })
  })

  it("returns pages=0 when limit is 0", () => {
    expect(buildPaginationMeta(1, 0, 95)).toEqual({
      page: 1,
      limit: 0,
      total: 95,
      pages: 0,
    })
  })
})
