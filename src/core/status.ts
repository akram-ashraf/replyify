import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  FORBIDDEN,
  INTERNAL_ERROR,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
  VALIDATION_ERROR,
} from "./codes"

const STATUS_MAP: Record<string, number> = {
  [OK]: 200,
  [CREATED]: 201,
  [BAD_REQUEST]: 400,
  [UNAUTHORIZED]: 401,
  [FORBIDDEN]: 403,
  [NOT_FOUND]: 404,
  [CONFLICT]: 409,
  [VALIDATION_ERROR]: 422,
  [INTERNAL_ERROR]: 500,
}

export function getStatus(code: string): number {
  return STATUS_MAP[code] ?? 500
}
