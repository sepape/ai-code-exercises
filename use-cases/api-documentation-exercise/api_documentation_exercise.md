# API Documentation Exercise

## Exercise Overview

In this exercise, I used AI to create documentation for a Python Flask API endpoint.

The selected endpoint allows a new user to register by providing a username, email address and password.

## Selected API

- Language: Python
- Framework: Flask
- HTTP method: `POST`
- Endpoint path: `/api/users/register`

## Original Endpoint Code

The original endpoint implementation is saved in:

`user_registration_endpoint.py`

---

# Prompt 1: Comprehensive Endpoint Documentation

## Generated Endpoint Documentation

### Register User API

This endpoint creates a new user account.

It validates the submitted information, checks that the username and email address are unique, hashes the password, stores the user and attempts to send a confirmation email.

### Endpoint

`POST /api/users/register`

### Authentication

No authentication is required.

This endpoint is public because users must register before they can log in.

### Request Headers

| Header | Value | Required |
|---|---|---|
| Content-Type | application/json | Yes |

### Path Parameters

There are no path parameters.

### Query Parameters

There are no query parameters.

### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| username | String | Yes | Unique username for the account |
| email | String | Yes | Valid and unique email address |
| password | String | Yes | Password containing at least 8 characters |

### Example Request

```http
POST /api/users/register
Content-Type: application/json
```

```json
{
  "username": "johnsmith",
  "email": "john@example.com",
  "password": "StrongPass123"
}
```

### Success Response

**Status code:** `201 Created`

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "johnsmith",
    "email": "john@example.com",
    "created_at": "2026-07-24T10:35:00",
    "role": "user"
  }
}
```

The response does not contain the password or password hash.

### Error Responses

#### 400 Bad Request — Missing Field

```json
{
  "error": "Missing required field",
  "message": "email is required"
}
```

#### 400 Bad Request — Invalid Email

```json
{
  "error": "Invalid email",
  "message": "Please provide a valid email address"
}
```

#### 400 Bad Request — Weak Password

```json
{
  "error": "Weak password",
  "message": "Password must be at least 8 characters long"
}
```

#### 409 Conflict — Username Taken

```json
{
  "error": "Username taken",
  "message": "Username is already in use"
}
```

#### 409 Conflict — Email Exists

```json
{
  "error": "Email exists",
  "message": "An account with this email already exists"
}
```

#### 500 Internal Server Error

```json
{
  "error": "Server error",
  "message": "Failed to register user"
}
```

### Example 1 — Successful Registration

#### Request

```json
{
  "username": "alice",
  "email": "alice@example.com",
  "password": "Password123"
}
```

#### Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 25,
    "username": "alice",
    "email": "alice@example.com",
    "created_at": "2026-07-24T11:00:00",
    "role": "user"
  }
}
```

### Example 2 — Email Already Exists

#### Request

```json
{
  "username": "alice2",
  "email": "alice@example.com",
  "password": "Password123"
}
```

#### Response

```json
{
  "error": "Email exists",
  "message": "An account with this email already exists"
}
```

### Special Considerations

- Usernames must be unique.
- Email addresses must be unique.
- Email addresses are converted to lowercase.
- Passwords must contain at least 8 characters.
- Passwords are hashed before storage.
- Passwords are never returned in responses.
- A confirmation email is attempted after registration.
- Registration still succeeds if the email cannot be sent.
- No rate limiting is defined in the code.
- HTTPS should be used in production.

## Prompt Used

```text
Please create comprehensive documentation for this API endpoint:

Endpoint: POST /api/users/register

Implementation code:
The Python Flask user registration endpoint.

Please include:
1. A clear description of the endpoint's purpose
2. Request parameters with types and descriptions
3. Response formats with status codes and examples
4. Authentication requirements
5. Potential error responses with codes and messages
6. At least two example requests with responses
7. Rate limiting or special considerations
```

---

# Prompt 2: OpenAPI Conversion

## Prompt Used

```text
Please convert the User Registration API documentation into a complete
OpenAPI 3.0 document.

Include:
1. The POST /api/users/register endpoint
2. The JSON request body schema
3. Required username, email and password fields
4. Success and error response schemas
5. Status codes 201, 400, 409 and 500
6. Example requests and responses
7. Reusable component schemas

Format the output as a complete and valid OpenAPI document.
```

## Converted Documentation

The API documentation was converted into OpenAPI 3.0 format.

The completed OpenAPI document is saved in:

`openapi.yaml`

The OpenAPI document includes:

- The `/api/users/register` path
- The `POST` HTTP method
- The JSON request body
- Required fields and validation information
- The `201`, `400`, `409` and `500` responses
- Example requests and responses
- Reusable schemas for requests, users, success responses and errors

---

# Prompt 3: Developer Usage Guide

## Prompt Used

```text
Please create a beginner-friendly developer guide for using the
POST /api/users/register endpoint.

The guide should explain how to:
1. Authenticate with the API
2. Properly format requests
3. Handle and interpret responses
4. Deal with common errors
5. Include example code in Python and JavaScript

API information:
Use the completed User Registration API endpoint documentation.

Target audience: Beginner developers

Tone: Friendly, clear and technical
```

## Developer Guide Result

The completed developer usage guide is saved in:

`developer_usage_guide.md`

The guide explains:

- Authentication requirements
- Request headers and JSON formatting
- Required request fields
- Python request examples
- JavaScript request examples
- Success and error response handling
- Security recommendations

---

# Review of the Generated Documentation

I reviewed the generated documentation against the original Python/Flask endpoint code.

The documentation correctly identifies:

- The `POST` method
- The `/api/users/register` endpoint path
- The required `username`, `email` and `password` fields
- The email validation rule
- The minimum password length of 8 characters
- The username and email uniqueness checks
- Password hashing before storage
- The `201`, `400`, `409` and `500` responses
- The confirmation email process
- The fact that no authentication is required
- The fact that no rate limiting is defined in the example code

One issue I noticed is that the endpoint assumes the request body contains valid JSON. The code does not explicitly handle an empty or invalid JSON request before checking the required fields.

---

# Reflection

## 1. Which parts of the API were most challenging to document?

The validation and error handling were the most challenging parts because the endpoint can return several different responses.

I had to study the code carefully to identify the conditions that return status codes `400`, `409` and `500`.

## 2. How did you adjust your prompts to get better results?

I improved the prompts by including:

- The exact HTTP method
- The endpoint path
- The implementation code
- The required documentation sections
- The expected output format
- Request and response examples
- Error handling requirements

This helped the AI generate more complete and structured documentation.

## 3. Which documentation format did you find most effective?

I found OpenAPI to be the most effective format because it is structured, standardised and machine-readable.

It can also be used with tools such as Swagger UI to create interactive API documentation.

Markdown was easier to read and was useful for the developer usage guide.

## 4. How would you incorporate this approach into your development workflow?

I would use AI to create a first draft of API documentation whenever I add or update an endpoint.

I would then compare the generated documentation with the actual code, correct any inaccurate information and save the documentation in the same repository as the source code.

This would help keep the API documentation current and easier for other developers to use.