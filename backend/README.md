## POST /users/register

Registers a new user and returns an authentication token plus the created user record.

### URL

POST /users/register

(This route is typically mounted under `/users`, so the full path is `/users/register`.)

### Content type

Content-Type: application/json

### Request body

The endpoint expects a JSON body with the following shape:

{
  "fullname": {
    "firstname": "string (required, min 3 chars)",
    "lastname": "string (optional)"
  },
  "email": "string (required, must be a valid email)",
  "password": "string (required, min 6 chars)"
}

Validation rules enforced by the server:
- `email` must be a valid email address.
- `fullname.firstname` must be at least 3 characters long.
- `password` must be at least 6 characters long.

### Example request

```json
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice@example.com",
  "password": "s3cr3t123"
}
```

### Successful response

- Status: 201 Created
- Body: JSON object containing `token` and the created `user` (password is not returned).

Example:

```json
HTTP/1.1 201 Created
{
  "token": "<jwt-token-string>",
  "user": {
    "_id": "64a1f7...",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice@example.com",
    "socketId": null
  }
}
```

Note: The `user` object returned comes from the Mongoose model. The `password` field is intentionally excluded from responses (select: false).

### Client / validation errors

- Status: 400 Bad Request
- Cause: validation errors (invalid email, missing/short firstname or password, etc.)
- Body format:

```json
{
  "errors": [
    {
      "msg": "Invalid email address",
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

### Server errors

- Status: 500 Internal Server Error
- Cause: unexpected errors (database failures, unique key conflicts if not handled, etc.)

Example generic error response:

```json
HTTP/1.1 500 Internal Server Error
{
```

### Notes / Implementation details

- The route uses `express-validator` for request validation. See `backend/routes/user.routes.js` for the applied checks.
- Passwords are hashed using bcrypt via `user.model.js` before being stored.
- A JWT token is generated on successful registration using `generateAuthToken()` on the user model.

### Quick curl example

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Alice","lastname":"Smith"},"email":"alice@example.com","password":"s3cr3t123"}'
```

### Example: GET /users/:id (retrieve user)

After successful registration you receive a JWT in the response. You can use that token to fetch the created user (or a protected "me" endpoint) by including it in the Authorization header.

Example curl (replace <jwt-token> and <user-id> with real values):

```bash
```

Example successful response:

```json
HTTP/1.1 200 OK
{
  "_id": "64a1f7...",
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice@example.com",
  "socketId": null
}
```

If your project exposes a `GET /users/me` endpoint that returns the currently authenticated user, use the same Authorization header but call `/users/me` instead of `/users/:id`.

## POST /users/login

### URL

POST /users/login

### Content type

Content-Type: application/json

### Request body

The endpoint expects a JSON body with the following shape:
  "password": "string (required, min 6 chars)"
}

Validation rules enforced by the server (see `backend/routes/user.routes.js`):
- `email` must be a valid email address.
- `password` must be at least 6 characters long.

### Example request

```json
POST /users/login
Content-Type: application/json

{
  "email": "alice@example.com",
  "password": "s3cr3t123"
}
```

### Successful response

- Status: 200 OK
- Body: JSON object containing `token` and the authenticated `user`.

Example:

```json
HTTP/1.1 200 OK
{
  "token": "<jwt-token-string>",
  "user": {
    "_id": "64a1f7...",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice@example.com",
    "socketId": null
  }
}
```

Note: The `password` field should NOT be included in the response. The login implementation needs to fetch the hashed password to compare credentials (for example with `.select('+password')`) but must remove or hide the password before returning the user object to the client (e.g., `user.password = undefined` or by using a safe serializer).

### Client / validation errors

- Status: 400 Bad Request
- Cause: validation errors (invalid email format, password too short, missing fields).
- Body format matches the `express-validator` errors array as in the register endpoint.

### Authentication errors

- Status: 401 Unauthorized
- Cause: invalid credentials (email not found or password mismatch).
- Example response:

```json
HTTP/1.1 401 Unauthorized
{
  "message": "Invalid email or password"
}
```

### Server errors

- Status: 500 Internal Server Error
- Cause: unexpected errors (database failures, etc.)

### Notes / Implementation details
```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"s3cr3t123"}'
```

## GET /users/profile

Returns the profile of the currently authenticated user. This route is protected by the `authUser` middleware and requires either a valid `token` cookie or an `Authorization: Bearer <token>` header.

### URL

GET /users/profile

### Headers / Cookies

- Cookie: `token=<jwt-token>` OR
- Header: `Authorization: Bearer <jwt-token>`

### Successful response

- Status: 200 OK
- Body: JSON object with the authenticated user's public fields (password excluded).

Example response:
HTTP/1.1 200 OK
{
  "_id": "64a1f7...",
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice@example.com",
  "socketId": null
}
```

### Authentication errors

- Status: 401 Unauthorized
- Cause: missing or invalid token, or token blacklisted during logout. Example response:

```json
HTTP/1.1 401 Unauthorized
{
  "message": "Unauthorized"
}
```
- This endpoint uses `auth.middleware.authUser` to validate the JWT and attach the user document to `req.user`.
- Because the middleware searches for blacklisted tokens, a token that was logged out will be rejected.

## GET /users/logout

Logs out the authenticated user by clearing the `token` cookie and adding the token to a blacklist (so it can't be reused).

### URL

GET /users/logout

### Headers / Cookies

- Cookie: `token=<jwt-token>` OR
### Successful response

- Status: 200 OK
Example response:

```json
HTTP/1.1 200 OK
{
  "message": "Logged out"
}
```

### Notes

- The `logoutUser` controller clears the `token` cookie and stores the token in a blacklist collection (`blacklistTokenModel`) to prevent reuse.
- Clients should also remove any stored tokens on their side (localStorage/sessionStorage) after receiving this response.

