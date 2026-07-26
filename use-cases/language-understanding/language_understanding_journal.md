# Applying AI to Deepen Programming Language Understanding

## Student Name

Sepape Rametse

## Programming Language

Python

## Exercise Overview

This exercise explored how artificial intelligence can help improve
Python programming knowledge. The activities focused on idiomatic Python,
code quality and Python decorators.

---

# Activity 1: Idiomatic Code Transformation

## Selected code

I selected a task-score function that calculates a score based on task
priority, completion status and due date.

## Prompt used

I'm learning to write more idiomatic Python. Here's my current code:

[paste the original task-score function]

Could you:

1. Suggest ways to make this more idiomatic
2. Explain why these changes follow language best practices
3. Point out any language features I'm not taking advantage of
4. Show me both my version and an improved version side by side

## Improvements made

- Replaced a long if and elif chain with a dictionary.
- Used direct Boolean checks.
- Used the dictionary get method.
- Added type hints.
- Added a docstring.
- Replaced unexplained numbers with named constants.
- Allowed the current date to be passed into the function for testing.

## Three key learnings

### Learning 1: Dictionaries can replace repeated conditions

I learned that dictionary mappings are often clearer than long if and
elif statements. They also make it easier to add new priority levels.

### Learning 2: Python uses truth-value testing

I learned that Python normally checks Boolean values directly. Writing
`if completed:` is clearer than writing `if completed == True:`.

### Learning 3: Testability affects function design

I learned that functions are easier to test when changing values, such
as the current date, can be supplied as arguments.

---

# Activity 2: Code Quality Detective

## Selected code

I reviewed an older-style function that filters, searches and sorts tasks.

## Prompt used

I'm a junior developer working with Python. Could you review this code
for quality improvements:

[paste the original task-search function]

Please:

1. Identify any code smells or quality issues
2. Suggest specific improvements
3. Explain why these improvements matter in Python
4. Rate the code's readability, performance and maintainability

## Ratings

- Readability: 5/10
- Performance: 6/10
- Maintainability: 4/10

## Issues identified

- The function name did not follow snake_case.
- It used an index loop instead of direct iteration.
- It compared Boolean values with True and False.
- It contained unnecessary nesting.
- It repeated `search.lower()` inside the loop.
- It used direct dictionary access.
- It sorted priority names alphabetically.
- It had no type hints or docstring.
- It combined searching, filtering and sorting.

## Code-review checklist

### Naming

- [ ] Do variables and functions use snake_case?
- [ ] Are names clear and descriptive?
- [ ] Are constants written in uppercase?

### Readability

- [ ] Is the function easy to understand?
- [ ] Is unnecessary nesting avoided?
- [ ] Are complex conditions separated?
- [ ] Does the function have a docstring?

### Python conventions

- [ ] Does the code avoid unnecessary Boolean comparisons?
- [ ] Does the code iterate directly over collections?
- [ ] Does the code use `is None` when checking for None?
- [ ] Are comprehensions still readable?

### Safety

- [ ] Are missing dictionary values handled?
- [ ] Are invalid values checked?
- [ ] Are specific exceptions handled correctly?

### Maintainability

- [ ] Does each function have one main responsibility?
- [ ] Is repeated logic extracted?
- [ ] Are type hints included?
- [ ] Are repeated values stored in constants?

### Performance

- [ ] Is repeated work avoided inside loops?
- [ ] Are suitable data structures used?
- [ ] Is unnecessary sorting avoided?

## Three key learnings

### Learning 1: Working code can still be poor-quality code

I learned that code can produce the correct output while still being
difficult to read, test or maintain.

### Learning 2: Clear names improve understanding

I learned that descriptive variable and function names reduce confusion
and make comments less necessary.

### Learning 3: Functions should have focused responsibilities

I learned that helper functions can separate searching, filtering and
sorting logic, making the code easier to test.

---

# Activity 3: Understanding Python Decorators

## Selected feature

I selected Python decorators as the language feature I wanted to understand.

## Prompt used

I want to improve my understanding of decorators in Python.

1. Could you explain this feature with simple examples?
2. Show me 3 practical use cases where this would be valuable
3. Provide a small project idea that would help me practise this feature
4. What common mistakes should I avoid when using this feature?

## What is a decorator?

A decorator is a function that adds or changes the behaviour of another
function without directly changing the original function.

## Three practical uses

1. Logging function calls
2. Measuring function performance
3. Checking user permissions

## Small project idea

Create a task-management service that uses decorators to log operations,
measure execution time and validate user permissions.

## Common mistakes

- Forgetting to use `functools.wraps`
- Forgetting to return the original function result
- Not accepting flexible arguments
- Hiding exceptions
- Ignoring decorator order

## Three key learnings

### Learning 1: Decorators add reusable behaviour

I learned that decorators can add logging, timing and validation to
multiple functions without duplicating code.

### Learning 2: Functions are objects in Python

I learned that Python functions can be passed into other functions and
returned as values.

### Learning 3: Decorators must be designed carefully

I learned that decorators should preserve metadata, return the original
result and avoid silently hiding exceptions.

---

# Group Discussion

## Nine key learnings

### Activity 1

1. Dictionary mappings can replace repetitive conditional statements.
2. Python prefers direct truth-value checks.
3. Functions become easier to test when changing values can be supplied.

### Activity 2

1. Correct code is not always high-quality code.
2. Clear naming improves readability.
3. Small functions improve maintainability and testing.

### Activity 3

1. Decorators provide reusable behaviour.
2. Python treats functions as objects.
3. Good decorators preserve metadata and return results correctly.

## Interesting code changes

The important code changes included:

- Replacing a long if statement with a dictionary.
- Replacing index-based loops with direct iteration.
- Extracting search logic into a helper function.
- Adding type hints and docstrings.
- Making dates controllable during testing.
- Creating logging and timing decorators.
- Adding automated pytest tests.

## Common themes

The common themes were:

- Readability
- Reusability
- Testability
- Maintainability
- Following Python conventions
- Reviewing AI-generated code
- Testing all suggested changes

## Final conclusion

This exercise demonstrated that AI can support programming-language
learning by explaining best practices, identifying code-quality issues
and introducing advanced language features.

AI suggestions must still be reviewed and tested by the developer.
The automated tests confirmed that the improved code behaved as expected.