# Exercise: Understanding What to Change with AI

## Exercise Overview

This exercise demonstrates how artificial intelligence can help analyse and improve code.

The three prompting strategies used are:

1. Code Readability Improvement
2. Function Refactoring
3. Code Duplication Detection

The exercise includes examples in Java, Python, and JavaScript. The purpose is not only to improve the code, but also to understand and explain the reasons behind each improvement.

---

# Exercise 1: Code Readability Improvement

## Programming Language

Java

## Prompt Used

```text
Review the following Java code for readability.

Use standard Java naming conventions.

Identify unclear class names, method names, variable names, and structural problems.

Suggest descriptive names and improve the organisation of the code without changing its intended behaviour.

Explain every important change.

Also identify any reliability or security concerns that become visible during the readability review.
```

## Original Readability Problems

The original code contains several unclear names:

* `UserMgr` does not clearly follow the full-word naming style normally preferred for Java classes.
* `U` does not explain that the class represents a user.
* `u_list` uses an underscore and does not follow Java camelCase conventions.
* `db` does not clearly explain that it is a database connection.
* `a()` does not explain what the method does.
* `f()` does not explain what the method does.
* `un`, `pw`, and `em` are unclear abbreviations.
* `nu` does not clearly mean a newly created user.
* `res` does not explain what result it contains.
* Getter names such as `getUn()` are not descriptive.

The code also mixes several responsibilities inside one method:

* Input validation
* Duplicate-user checking
* User creation
* Database saving
* Updating the in-memory user list

The SQL statement is created through string concatenation. This creates a possible SQL injection vulnerability.

The code also adds the user to the in-memory list before confirming that the database operation succeeded. If the database operation fails, the user will still remain in memory.

Passwords also appear to be stored directly instead of being hashed.

## AI-Assisted Improved Code

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

class UserManager {
    private static final int MINIMUM_USERNAME_LENGTH = 3;
    private static final int MINIMUM_PASSWORD_LENGTH = 8;

    private final List<User> users;
    private final DatabaseConnection databaseConnection;

    public UserManager(DatabaseConnection databaseConnection) {
        this.databaseConnection = Objects.requireNonNull(
            databaseConnection,
            "Database connection cannot be null."
        );
        this.users = new ArrayList<>();
    }

    public boolean addUser(String username, String password, String email) {
        if (!isValidUserInput(username, password, email)) {
            return false;
        }

        if (findUserByUsername(username) != null) {
            return false;
        }

        User newUser = new User(username, password, email);

        boolean userSaved = databaseConnection.insertUser(
            newUser.getUsername(),
            newUser.getPassword(),
            newUser.getEmail()
        );

        if (userSaved) {
            users.add(newUser);
        }

        return userSaved;
    }

    public User findUserByUsername(String username) {
        if (username == null) {
            return null;
        }

        for (User user : users) {
            if (user.getUsername().equals(username)) {
                return user;
            }
        }

        return null;
    }

    private boolean isValidUserInput(
        String username,
        String password,
        String email
    ) {
        if (username == null || password == null || email == null) {
            return false;
        }

        return username.length() >= MINIMUM_USERNAME_LENGTH
            && password.length() >= MINIMUM_PASSWORD_LENGTH
            && email.contains("@");
    }
}

class User {
    private final String username;
    private final String password;
    private final String email;

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }
}

interface DatabaseConnection {
    boolean insertUser(String username, String password, String email);
}
```

## Changes Made

### Class names

The class name:

```java
UserMgr
```

was changed to:

```java
UserManager
```

This uses a complete and descriptive name.

The class name:

```java
U
```

was changed to:

```java
User
```

This clearly communicates what the class represents.

### Variable names

The following variables were renamed:

| Original | Improved             | Reason                           |
| -------- | -------------------- | -------------------------------- |
| `u_list` | `users`              | Clearly describes the list       |
| `db`     | `databaseConnection` | Explains the object’s purpose    |
| `un`     | `username`           | Removes unclear abbreviation     |
| `pw`     | `password`           | Removes unclear abbreviation     |
| `em`     | `email`              | Removes unclear abbreviation     |
| `nu`     | `newUser`            | Describes the newly created user |
| `res`    | `userSaved`          | Explains the result being stored |

### Method names

The method:

```java
a()
```

was changed to:

```java
addUser()
```

The method:

```java
f()
```

was changed to:

```java
findUserByUsername()
```

The improved method names explain their purpose without requiring the reader to inspect their implementation.

### Extracted validation

The input-validation logic was moved into:

```java
isValidUserInput()
```

This makes `addUser()` shorter and easier to understand.

### Added constants

The minimum username and password lengths were moved into named constants:

```java
MINIMUM_USERNAME_LENGTH
MINIMUM_PASSWORD_LENGTH
```

This removes unexplained numbers from the validation logic.

### Improved database consistency

The user is now added to the in-memory list only after the database operation succeeds.

This prevents the database and the in-memory list from containing different information.

### Reduced direct SQL handling

The improved `UserManager` calls:

```java
databaseConnection.insertUser(...)
```

instead of constructing SQL directly.

The database implementation should use a prepared statement.

For example:

```java
String sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
```

This is safer than combining user input directly into an SQL string.

## Issues I Might Have Missed Without AI

The most obvious problem was the unclear naming. However, the review also revealed less obvious problems:

* SQL injection risk
* Passwords appearing to be stored without hashing
* A possible inconsistency between the database and the in-memory list
* Missing checks for `null` values
* Unexplained validation numbers
* Too many responsibilities inside the `addUser()` method

## Comparison with My Own Ideas

My first approach would have been to rename the variables and methods only.

The AI-assisted review went further by identifying structural, reliability, and security concerns.

The final solution combines both approaches:

* It uses descriptive names.
* It separates validation from user creation.
* It avoids direct SQL construction.
* It only updates memory after a successful database operation.

---

# Exercise 2: Function Refactoring

## Programming Language

Python

## Prompt Used

```text
Refactor the following Python function.

Its responsibilities are to process orders, validate inventory and customer
information, update inventory, calculate prices, calculate shipping and tax,
and track revenue.

Break the function into smaller, focused functions.

Preserve the original behaviour and return structure.

Use descriptive function and variable names, type hints, constants, and clear
error handling.

Explain why each function was extracted and identify any possible edge cases.
```

## Problems Identified

The original `process_orders()` function performs too many tasks:

* Extracting order information
* Checking whether an item exists
* Checking available stock
* Checking whether a customer exists
* Calculating the item price
* Applying a premium discount
* Calculating shipping
* Calculating tax
* Updating inventory
* Constructing the processed-order result
* Tracking errors
* Calculating total revenue

This makes the function difficult to read, test, modify, and reuse.

The values `0.9`, `0.08`, `5.99`, `15.99`, and `50` are also unexplained numbers.

## AI-Assisted Refactored Code

```python
from typing import Any


PREMIUM_DISCOUNT_RATE = 0.10
TAX_RATE = 0.08
DOMESTIC_FREE_SHIPPING_THRESHOLD = 50.00
DOMESTIC_SHIPPING_FEE = 5.99
INTERNATIONAL_SHIPPING_FEE = 15.99


def validate_order(
    order: dict[str, Any],
    inventory: dict[str, dict[str, Any]],
    customer_data: dict[str, dict[str, Any]],
) -> str | None:
    """Return an error message when an order cannot be processed."""

    item_id = order["item_id"]
    quantity = order["quantity"]
    customer_id = order["customer_id"]

    if item_id not in inventory:
        return "Item not in inventory"

    if inventory[item_id]["quantity"] < quantity:
        return "Insufficient quantity"

    if customer_id not in customer_data:
        return "Customer not found"

    return None


def calculate_discounted_price(
    unit_price: float,
    quantity: int,
    is_premium_customer: bool,
) -> float:
    """Calculate the price before shipping and tax."""

    price = unit_price * quantity

    if is_premium_customer:
        price *= 1 - PREMIUM_DISCOUNT_RATE

    return price


def calculate_shipping(price: float, customer_location: str) -> float:
    """Calculate shipping based on price and customer location."""

    if customer_location == "domestic":
        if price < DOMESTIC_FREE_SHIPPING_THRESHOLD:
            return DOMESTIC_SHIPPING_FEE

        return 0.0

    return INTERNATIONAL_SHIPPING_FEE


def calculate_tax(price: float) -> float:
    """Calculate tax on the discounted item price."""

    return price * TAX_RATE


def create_processed_order(
    order: dict[str, Any],
    price: float,
    shipping: float,
    tax: float,
) -> dict[str, Any]:
    """Create the result returned for a successfully processed order."""

    final_price = price + shipping + tax

    return {
        "order_id": order["order_id"],
        "item_id": order["item_id"],
        "quantity": order["quantity"],
        "customer_id": order["customer_id"],
        "price": price,
        "shipping": shipping,
        "tax": tax,
        "final_price": final_price,
    }


def create_error_order(
    order_id: str,
    error_message: str,
) -> dict[str, str]:
    """Create a standard error-order result."""

    return {
        "order_id": order_id,
        "error": error_message,
    }


def process_single_order(
    order: dict[str, Any],
    inventory: dict[str, dict[str, Any]],
    customer_data: dict[str, dict[str, Any]],
) -> tuple[dict[str, Any] | None, dict[str, str] | None]:
    """Validate and process one order."""

    validation_error = validate_order(order, inventory, customer_data)

    if validation_error:
        error_order = create_error_order(
            order["order_id"],
            validation_error,
        )
        return None, error_order

    item_id = order["item_id"]
    quantity = order["quantity"]
    customer_id = order["customer_id"]

    inventory_item = inventory[item_id]
    customer = customer_data[customer_id]

    price = calculate_discounted_price(
        unit_price=inventory_item["price"],
        quantity=quantity,
        is_premium_customer=customer["premium"],
    )

    shipping = calculate_shipping(
        price=price,
        customer_location=customer["location"],
    )

    tax = calculate_tax(price)

    processed_order = create_processed_order(
        order=order,
        price=price,
        shipping=shipping,
        tax=tax,
    )

    inventory_item["quantity"] -= quantity

    return processed_order, None


def process_orders(
    orders: list[dict[str, Any]],
    inventory: dict[str, dict[str, Any]],
    customer_data: dict[str, dict[str, Any]],
) -> dict[str, Any]:
    """Process orders, update inventory, and calculate total revenue."""

    processed_orders = []
    error_orders = []
    total_revenue = 0.0

    for order in orders:
        processed_order, error_order = process_single_order(
            order,
            inventory,
            customer_data,
        )

        if error_order is not None:
            error_orders.append(error_order)
            continue

        if processed_order is not None:
            processed_orders.append(processed_order)
            total_revenue += processed_order["final_price"]

    return {
        "processed_orders": processed_orders,
        "error_orders": error_orders,
        "total_revenue": total_revenue,
    }
```

## Functions Extracted

### `validate_order()`

This function checks:

* Whether the item exists
* Whether enough stock is available
* Whether the customer exists

It returns an error message or `None`.

### `calculate_discounted_price()`

This function:

* Calculates the base item price
* Applies the premium-customer discount

This separates pricing rules from order processing.

### `calculate_shipping()`

This function handles domestic and international shipping rules.

Shipping rules can now be changed without editing the main processing function.

### `calculate_tax()`

This function calculates tax independently.

If tax rules change later, they can be updated in one place.

### `create_processed_order()`

This function creates a consistent result dictionary for successful orders.

### `create_error_order()`

This function creates a consistent error dictionary.

### `process_single_order()`

This function coordinates the processing of one order.

The main `process_orders()` function is left responsible for:

* Looping through orders
* Collecting successful results
* Collecting errors
* Tracking total revenue

## Improvements

### Named constants

The following values were converted into named constants:

```python
PREMIUM_DISCOUNT_RATE
TAX_RATE
DOMESTIC_FREE_SHIPPING_THRESHOLD
DOMESTIC_SHIPPING_FEE
INTERNATIONAL_SHIPPING_FEE
```

This makes the business rules easier to understand and update.

### Type hints

Type hints communicate the expected parameters and return values.

They also allow tools such as Pylance and mypy to detect some errors before runtime.

### Smaller functions

Each function now has a focused responsibility.

This makes each part easier to:

* Read
* Test
* Debug
* Reuse
* Change

## Edge Cases Identified

The refactored solution preserves the original behaviour, but a production version should also consider:

* Empty order lists
* Missing dictionary keys
* Zero or negative quantities
* Invalid item prices
* Unknown customer-location values
* Incorrect data types
* Floating-point rounding
* Whether tax should apply to shipping
* Whether tax should be calculated before or after discounts
* Inventory changes when a later operation fails

For financial applications, `Decimal` would normally be safer than `float`.

## Comparison with My Own Ideas

My first idea was to create only three smaller functions:

* Validate the order
* Calculate the price
* Calculate shipping

The AI-assisted solution suggested additional separation for:

* Tax calculation
* Error-result creation
* Processed-result creation
* Single-order processing
* Constants and type hints

I agree with most of these extractions because they make individual business rules easier to test.

However, for a very small program, extracting too many tiny functions could make the code harder for beginners to follow. The number of extracted functions should match the size and future needs of the project.

---

# Exercise 3: Code Duplication Detection

## Programming Language

JavaScript

## Prompt Used

```text
Review the following JavaScript function for duplicated logic.

Identify every repeated pattern.

Refactor the code to consolidate the repeated average and maximum calculations.

Preserve the original return structure.

The final solution should remain understandable to junior developers.

Explain why the chosen approach is clearer than the alternatives and handle
the empty-array case safely.
```

## Repeated Patterns Identified

The original function contains two major repeated patterns.

### Repeated average calculation

The following process is repeated for age, income, and score:

1. Create a total variable.
2. Loop through all users.
3. Add a property value to the total.
4. Divide the total by the number of users.

### Repeated highest-value calculation

The following process is also repeated for age, income, and score:

1. Start with the first value.
2. Loop through the remaining users.
3. Compare each value with the current highest value.
4. Replace the highest value when necessary.

Only the property name changes between these sections.

## AI-Assisted Improved Code

```javascript
function calculatePropertyStatistics(userData, propertyName) {
  let total = 0;
  let highest = userData[0][propertyName];

  for (const user of userData) {
    const value = user[propertyName];

    total += value;

    if (value > highest) {
      highest = value;
    }
  }

  return {
    average: total / userData.length,
    highest
  };
}

function calculateUserStatistics(userData) {
  if (!Array.isArray(userData) || userData.length === 0) {
    return {
      age: {
        average: 0,
        highest: null
      },
      income: {
        average: 0,
        highest: null
      },
      score: {
        average: 0,
        highest: null
      }
    };
  }

  return {
    age: calculatePropertyStatistics(userData, "age"),
    income: calculatePropertyStatistics(userData, "income"),
    score: calculatePropertyStatistics(userData, "score")
  };
}
```

## Explanation of the Refactoring

A reusable function named:

```javascript
calculatePropertyStatistics()
```

was created.

It receives:

* The array of users
* The name of the property to calculate

For example:

```javascript
calculatePropertyStatistics(userData, "age")
```

calculates the average and highest age.

The same helper function can then be used for:

```javascript
"income"
"score"
```

The average and maximum are calculated in the same loop. This avoids looping through the same data separately for the average and highest value.

## Empty-Array Handling

The original code assumes that at least one user exists.

This line would fail for an empty array:

```javascript
userData[0].age
```

Dividing by an empty array length would also result in an invalid average.

The improved code checks:

```javascript
if (!Array.isArray(userData) || userData.length === 0)
```

It then returns safe default values.

## Why This Approach Is Suitable for Junior Developers

The solution uses:

* One clearly named helper function
* A normal `for...of` loop
* A visible total
* A visible highest-value comparison
* A return structure that matches the original code

An alternative would be to use methods such as:

```javascript
reduce()
Math.max()
map()
Object.fromEntries()
```

Those approaches can produce shorter code, but combining several advanced methods may make the code harder for junior developers to understand.

The selected approach removes duplication while keeping the algorithm visible.

## Alternative Concise Version

```javascript
function calculatePropertyStatistics(userData, propertyName) {
  const values = userData.map((user) => user[propertyName]);

  const total = values.reduce((sum, value) => sum + value, 0);

  return {
    average: total / values.length,
    highest: Math.max(...values)
  };
}
```

This alternative is shorter, but it creates a separate array and uses several JavaScript concepts together.

For a team of junior developers, the explicit loop is likely to be easier to debug and explain.

## Comparison with My Own Ideas

My initial idea was to create separate functions:

```javascript
calculateAverage()
findHighest()
```

That approach would remove some duplication, but it would require two loops for every property.

The AI-assisted solution combines average and highest calculations into one helper function and one loop per property.

I prefer the AI-assisted version because it is efficient, readable, and not excessively abstract.

---

# Reflection Questions

## 1. Which prompting strategy did you find most useful? Why?

I found the **Function Refactoring** strategy most useful.

The original Python function contained many different responsibilities. The refactoring prompt helped identify logical boundaries inside the function.

The strategy showed how a large function could be separated into smaller functions for:

* Validation
* Discount calculation
* Shipping calculation
* Tax calculation
* Inventory updates
* Result construction
* Error handling

This makes the program easier to test and maintain.

The strategy is especially useful in real projects because business rules often change independently. For example, shipping fees may change without the validation rules changing.

## 2. What improvements did the AI suggest that you might not have thought of?

The AI suggested several improvements beyond simple code formatting:

* Replacing unclear numbers with named constants
* Adding type hints to Python functions
* Checking for empty arrays in JavaScript
* Preventing the Java database and in-memory list from becoming inconsistent
* Avoiding SQL string concatenation
* Considering password hashing
* Calculating average and maximum in one loop
* Separating error-result creation from business logic
* Identifying financial rounding as a possible issue
* Recognising that excessive abstraction can reduce readability

These suggestions demonstrated that code improvement is not limited to renaming variables. It can also involve security, reliability, maintainability, and edge-case handling.

## 3. Were there any AI suggestions that you disagreed with? Why?

I would disagree with extracting every small expression into a separate function.

Too many small functions can force a developer to move repeatedly between different parts of a file to understand a simple process.

For a small learning project, some logic can remain together when:

* It is short
* It is used only once
* Its purpose is already clear
* Extracting it would not improve testing or reuse

I would also avoid highly abstract JavaScript solutions that dynamically process every object property through nested higher-order methods.

Although such solutions may be shorter, they may be harder for junior developers to read and debug.

The goal should be balanced refactoring, not automatically producing the smallest or most abstract code.

## 4. How might you adapt these prompts for your own codebase or technology stack?

I would include information about:

* The programming language
* The framework being used
* The project’s coding standards
* Expected behaviour
* Performance requirements
* Security requirements
* Whether public interfaces may change
* The experience level of the development team
* Existing testing tools
* Database and deployment technologies

For example, for a Python task-management application, I could use:

```text
Review this Python Task Manager service for readability and maintainability.

Follow PEP 8 naming conventions and preserve the current public behaviour.

The application stores task data in JSON files and uses object-oriented
programming.

Identify unclear names, duplicated logic, functions with too many
responsibilities, file-handling risks, and missing error handling.

Suggest improvements suitable for junior Python developers.

Do not change the stored JSON format because existing task files must continue
to work.
```

For a NaturalONE and Adabas project, I could state:

```text
Review this Natural program used with an Adabas view.

Preserve the existing DDM field names and database behaviour.

Identify unclear variable names, repeated validation, database error-handling
problems, and sections that should become subroutines.

Explain the suggested changes using Natural programming terminology.
```

Providing the AI with project-specific constraints reduces the chance of receiving suggestions that cannot be used in the real codebase.

## 5. What safeguards would you put in place before applying AI-suggested refactoring to production code?

Before applying AI-generated changes to production code, I would:

1. Review every suggested change manually.
2. Confirm that the AI understood the original behaviour.
3. Create or update automated tests.
4. Run unit tests before making changes.
5. Apply the refactoring in small steps.
6. Run tests after each important step.
7. Use version control and create a separate Git branch.
8. Request a code review from another developer.
9. Run static analysis and linting tools.
10. Check security-sensitive changes carefully.
11. Test database migrations and queries in a non-production environment.
12. Compare performance before and after the refactoring.
13. Confirm backward compatibility.
14. Keep a rollback plan.
15. Avoid placing passwords, customer information, or confidential code into unauthorised AI systems.

AI suggestions should be treated as recommendations, not automatically trusted changes.

---

# Overall Learning

This exercise showed that different code problems require different prompting strategies.

The readability strategy was useful for identifying:

* Poor names
* Unclear structure
* Hidden reliability issues
* Security concerns

The function-refactoring strategy was useful for identifying:

* Multiple responsibilities
* Business-rule boundaries
* Functions that can be tested independently
* Unexplained constants

The duplication-detection strategy was useful for identifying:

* Repeated loops
* Repeated calculations
* Opportunities for reusable helper functions
* The balance between abstraction and readability

The most important lesson is that AI should support developer judgement rather than replace it.

A developer must still:

* Understand the original code
* Verify the AI’s assumptions
* Consider the experience of the team
* Test the proposed changes
* Protect confidential information
* Explain why a refactoring improves the code

---

# Conclusion

The three code examples were improved using targeted AI prompting strategies.

The Java example became easier to read through descriptive naming and clearer separation of responsibilities.

The Python example was divided into focused functions that make its business rules easier to test and maintain.

The JavaScript example removed repeated calculations through a reusable helper function while remaining suitable for junior developers.

The exercise demonstrated that well-written prompts can help reveal readability, duplication, structure, reliability, security, and maintainability problems that may otherwise be missed.
