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
      "param": "email",
      "location": "body"
    },
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
  "error": "Internal server error"
}
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
curl -X GET http://localhost:3000/users/<user-id> \
  -H "Authorization: Bearer <jwt-token>" \
  -H "Content-Type: application/json"
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
