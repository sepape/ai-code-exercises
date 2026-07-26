# Contextual Learning with FastAPI

## Part 1: Framework Comparison

### Personal Translation Table

| Familiar concept | Flask or Django | FastAPI equivalent | Main difference |
|---|---|---|---|
| Application | Flask application or Django project | `FastAPI()` | FastAPI is focused mainly on APIs |
| Route | `@app.route()` or Django URL pattern | `@app.get()` and `@app.post()` | The HTTP method is part of the decorator |
| View | Flask or Django view | Path operation function | Type hints define and validate inputs |
| Blueprint | Flask `Blueprint` | `APIRouter` | Both organise related routes |
| Request body | `request.get_json()` | Pydantic model | FastAPI parses and validates it automatically |
| Form validation | Django Form | Pydantic model or form dependency | FastAPI focuses on API and request data |
| Shared route logic | Decorator or helper function | `Depends()` | FastAPI injects dependencies automatically |
| Authentication | Login decorator, middleware or backend | Security dependency | Authentication is declared in the route signature |
| Error response | Manual response or exception | `HTTPException` | Produces a structured HTTP error |
| API documentation | Usually added separately | Swagger UI and ReDoc | Generated automatically |
| Serialization | Serializer or manual JSON | Pydantic response model | FastAPI validates and filters responses |
| Middleware | Flask or Django middleware | FastAPI middleware | Used mainly for global request processing |
| Asynchronous route | Additional framework support | `async def` | Async routes are supported directly |

### FastAPI and Flask

FastAPI and Flask both use Python functions and route decorators to create web
endpoints. Both can receive requests and return JSON responses.

Flask has a smaller core and commonly relies on extensions or manual code for
validation, serialization and documentation. FastAPI uses Python type hints and
Pydantic models to perform validation and create API documentation.

### Dependency Injection and Django Middleware

Django middleware normally processes requests globally. FastAPI dependencies
can be applied only to the routes that need them.

For example, `get_current_user` runs only for endpoints that declare it with
`Depends()`. This makes shared logic such as authentication reusable and visible.

### Flask Blueprint Equivalent

The FastAPI equivalent of a Flask Blueprint is `APIRouter`. It groups related
routes and allows a large application to be divided into multiple files.

### Request Validation

Django Forms are commonly used to validate HTML form submissions. FastAPI uses
typed parameters and Pydantic models to validate JSON bodies, query parameters,
path parameters, headers and form data.

Invalid input is rejected automatically with a structured validation response.

## Part 2: Understanding FastAPI's Design Choices

### Why FastAPI Uses Pydantic

FastAPI uses Pydantic because it provides data validation, parsing,
serialization and schema generation using standard Python type hints.

A Pydantic model can define what data an API expects, validate incoming data,
support editor autocompletion and help generate the OpenAPI documentation.

### Automatic API Documentation

FastAPI creates API documentation directly from the application's endpoints,
parameters, models and response types.

This reduces the risk of documentation becoming different from the actual code.
Developers can also use Swagger UI to test endpoints from a browser.

### Extensive Use of Type Hints

Type hints tell FastAPI what input a route expects and what validation to apply.
They also improve code completion, readability, static checking and
refactoring.

For example, declaring `user_id: int` tells FastAPI to convert and validate the
path value as an integer.

### Async-First Approach

Web APIs often wait for database queries, network calls and external services.
Asynchronous programming allows the server to perform other work while waiting
for these operations.

FastAPI supports both `async def` and regular `def` functions. Developers should
use `async def` when the libraries they call support `await`.

### FastAPI Design Philosophy Summary

FastAPI uses standard Python features and open web standards to reduce repeated
work. Its design is centred on typed data contracts, automatic validation,
automatic documentation, reusable dependencies and support for asynchronous
I/O.

This encourages developers to organise applications into routes, Pydantic
models, dependencies and service functions. Larger applications can use
`APIRouter` to separate features into modules.

## Part 3: JWT Authentication Reflection

### 1. How does FastAPI authentication compare with other frameworks?

FastAPI authentication is explicit and dependency-based. A protected route
declares that it requires an authenticated user using `Depends()`.

In Flask, authentication is often implemented using decorators or extensions.
In Django, authentication is commonly integrated through middleware, sessions,
authentication backends and user models.

FastAPI does not force one complete authentication system. It provides reusable
security components that developers combine according to the application's
requirements.

### 2. What advantages does dependency injection provide?

FastAPI dependency injection reduces duplicated authentication code. It keeps
authentication separate from route business logic and allows one dependency to
reuse another dependency.

For example, `get_current_active_user` depends on `get_current_user`, while
`get_current_user` depends on `oauth2_scheme`.

This creates a clear authentication chain that FastAPI resolves automatically.

### 3. How do type hints make the security implementation clearer?

Type hints show what information a security function receives and what kind of
object it returns.

The declaration `current_user: User` tells developers and editor tools that the
route works with a validated User object. Pydantic models also distinguish the
public User model from the database model that contains the hashed password.

### 4. What patterns from other frameworks appear in the implementation?

The application contains several familiar patterns:

- Pydantic models act like schemas or serializers.
- Route functions act like controllers or views.
- `authenticate_user()` acts like an authentication service.
- `fake_users_db` acts like a simple user repository.
- `get_current_user()` acts like an authentication guard.
- `HTTPException` creates structured error responses.
- `response_model` controls the data returned to the client.