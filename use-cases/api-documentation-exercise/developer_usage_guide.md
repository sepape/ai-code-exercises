# User Registration API Developer Guide

## Introduction

This guide explains how a beginner developer can use the User Registration API to create a new user account.

The endpoint accepts a username, email address and password in JSON format.

## Endpoint

```http
POST /api/users/register
```

Example local URL:

```text
http://localhost:5000/api/users/register
```

## Authentication

This endpoint does not require authentication.

A user cannot provide a login token before creating an account, so the registration endpoint must be publicly accessible.

## Request Headers

The request must include the following header:

```http
Content-Type: application/json
```

## Request Body

The JSON request body must contain:

| Field | Type | Required | Description |
|---|---|---|---|
| username | String | Yes | Unique username for the user |
| email | String | Yes | Valid and unique email address |
| password | String | Yes | Password with at least 8 characters |

Example request body:

```json
{
  "username": "johnsmith",
  "email": "john@example.com",
  "password": "StrongPass123"
}
```

## Python Request Example

Install the Requests package if it is not already installed:

```bash
pip install requests
```

Use the following Python code:

```python
import requests

url = "http://localhost:5000/api/users/register"

user_data = {
    "username": "johnsmith",
    "email": "john@example.com",
    "password": "StrongPass123"
}

try:
    response = requests.post(
        url,
        json=user_data,
        timeout=10
    )

    print("Status code:", response.status_code)
    print("Response:", response.json())

except requests.RequestException as error:
    print("Request failed:", error)
```

## JavaScript Request Example

```javascript
const userData = {
  username: "johnsmith",
  email: "john@example.com",
  password: "StrongPass123"
};

fetch("http://localhost:5000/api/users/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(userData)
})
  .then(async response => {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log("Registration successful:", data);
  })
  .catch(error => {
    console.error("Registration failed:", error.message);
  });
```

## Successful Response

A successful registration returns:

```text
201 Created
```

Example:

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

## Handling Common Responses

### 201 Created

The user account was created successfully.

The application can inform the user that registration was successful and ask them to check their email for confirmation.

### 400 Bad Request

The submitted information is missing or invalid.

Possible reasons include:

- Missing username
- Missing email
- Missing password
- Invalid email format
- Password shorter than 8 characters

### 409 Conflict

The username or email address already belongs to another account.

The application should ask the user to choose a different username or email address.

### 500 Internal Server Error

The server could not complete the registration.

The application should display a general message and avoid showing internal technical details.

## Python Error-Handling Example

```python
if response.status_code == 201:
    print("Registration successful")

elif response.status_code == 400:
    print("Please check the information you entered")

elif response.status_code == 409:
    print("The username or email already exists")

elif response.status_code == 500:
    print("The server could not complete the registration")

else:
    print("Unexpected response:", response.status_code)
```

## Security Recommendations

- Use HTTPS in production.
- Never log plain-text passwords.
- Never send password hashes back to users.
- Add rate limiting to reduce automated registration abuse.
- Validate all request fields.
- Use stronger password rules where necessary.
- Confirm the user's email before allowing sensitive actions.
- Return clear error messages without exposing server details.