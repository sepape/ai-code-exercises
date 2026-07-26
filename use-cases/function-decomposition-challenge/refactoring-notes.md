# Function Decomposition Challenge

## Selected Function

I selected the JavaScript user-data validation function.

The original function validates user registration and profile-update
information. It contains several nested conditional statements and performs
many responsibilities inside one function.

## Original Problem

The original `validateUserData()` function was difficult to read because it
handled all validation responsibilities in one place.

The function performed:

- Required-field validation
- Registration validation
- Profile-update validation
- Username validation
- Password validation
- Email validation
- Date-of-birth validation
- Address validation
- Postal-code validation
- Phone-number validation
- Custom validation

Because all this logic was placed inside one function, the function was long
and contained deeply nested conditional statements.

## Distinct Responsibilities Identified

The following distinct responsibilities were identified:

1. Check required registration fields.
2. Check profile-update fields.
3. Validate usernames.
4. Validate passwords and password confirmation.
5. Validate email addresses.
6. Validate dates of birth.
7. Validate address objects.
8. Validate postal codes.
9. Validate phone numbers.
10. Execute custom validation rules.
11. Collect validation errors.

## Decomposition Plan

I extracted the following helper functions:

- `validateRequiredRegistrationFields()`
- `validateProfileFields()`
- `validateUsername()`
- `validatePassword()`
- `validateEmail()`
- `validateDateOfBirth()`
- `validateAddress()`
- `validatePostalCode()`
- `validatePhone()`
- `validateCustomFields()`

The main `validateUserData()` function now coordinates the validation process
and combines the error arrays returned by the helper functions.

## Refactoring Approach

I first examined the original function and identified sections that performed
independent validation tasks.

Each validation section was moved into a clearly named helper function. Each
helper function receives only the information it needs and returns an array of
errors.

For example, username validation was moved into
`validateUsername()`, while password validation was moved into
`validatePassword()`.

The main function uses the spread operator to add the returned errors to the
main error array.

Example:

```javascript
errors.push(
  ...validateUsername(
    userData.username,
    options.checkExisting
  )
);