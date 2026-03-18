import type { PaginationMeta } from "./types"

export function buildPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  const pages = limit <= 0 || total === 0 ? 0 : Math.ceil(total / limit)

  return {
    page,
    limit,
    total,
    pages,
  }
}
