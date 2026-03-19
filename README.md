# @ironstack/replyify

Lightweight Node.js API response formatting for consistent success, error, validation, and pagination replies.

Docs: https://akram-ashraf.github.io/replyify/

## Why replyify

Most backends start with simple route handlers and drift into inconsistent response shapes:

```ts
res.json(data)
res.status(400).json({ error: "Invalid request" })
throw new Error("User not found")
```

That creates problems for frontend consumers, SDKs, error handling, and long-term maintenance.

replyify gives you one predictable contract for:

- success replies
- error replies
- validation errors
- pagination metadata
- Express handler wrapping
- Express error middleware

## What it solves

With replyify, routes move from ad hoc JSON to a stable reply format:

```ts
return ok(user)
throw apiError("NOT_FOUND", "User not found")
return paginate(users, { page, limit, total })
```

## Install

```bash
npm install @ironstack/replyify
```

## Response shape

Success:

```ts
{
  success: true,
  code: "OK",
  message: "Success",
  data: {},
  meta: {}
}
```

Error:

```ts
{
  success: false,
  code: "NOT_FOUND",
  message: "User not found",
  errors: [],
  meta: {}
}
```

Pagination:

```ts
{
  success: true,
  code: "OK",
  message: "Success",
  data: [],
  meta: {
    page: 1,
    limit: 10,
    total: 100,
    pages: 10
  }
}
```

## Usage

### Basic replies

```ts
import { fail, ok, paginate, validationError, apiError } from "@ironstack/replyify"

return ok({ id: 1, name: "Asha" })

return fail("BAD_REQUEST", "Invalid request")

return validationError([
  { field: "name", message: "Required" }
])

return paginate(users, {
  page: 1,
  limit: 10,
  total: 42
})

throw apiError("NOT_FOUND", "User not found")
```

### Express

```ts
import express from "express"
import { ok, apiError } from "@ironstack/replyify"
import { replyHandler, errorMiddleware } from "@ironstack/replyify/express"

const app = express()

app.get(
  "/users/:id",
  replyHandler(async (req) => {
    const user = req.params.id === "1"
      ? { id: "1", name: "Asha" }
      : null

    if (!user) {
      throw apiError("NOT_FOUND", "User not found")
    }

    return ok(user)
  })
)

app.use(errorMiddleware())
```

### Before and after

Before:

```ts
app.get("/users", async (req, res) => {
  res.json(users)
})
```

After:

```ts
app.get(
  "/users",
  replyHandler(async () => {
    return ok(users)
  })
)
```

## API

### `ok(data, message?, meta?)`

Builds a success reply result.

### `fail(code, message, errors?, meta?)`

Builds an error reply result without throwing.

### `paginate(data, options)`

Builds a paginated reply result with page metadata.

### `apiError(code, message, errors?, meta?)`

Creates an `ApiError` instance.

### `validationError(errors, message?)`

Builds a validation error reply.

### `ApiError`

Error class with `code`, `status`, `message`, `errors`, and `meta`.

### `replyHandler(fn)`

Express wrapper that executes your route, formats returned reply results, and sends JSON automatically.

### `errorMiddleware()`

Express middleware that normalizes thrown errors and sends replyify-formatted JSON.

## Status mapping

- `OK` -> `200`
- `CREATED` -> `201`
- `BAD_REQUEST` -> `400`
- `UNAUTHORIZED` -> `401`
- `FORBIDDEN` -> `403`
- `NOT_FOUND` -> `404`
- `CONFLICT` -> `409`
- `VALIDATION_ERROR` -> `422`
- `INTERNAL_ERROR` -> `500`

## Development

```bash
npm run typecheck
npm run test
npm run build
```

## License

MIT
