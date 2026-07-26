# Part 2 - Step 3: Guided Implementation

## Prompt Used

I'm ready to implement my first JavaScript program.

Please guide me through creating a simple application that:

- Greets the user
- Checks if the user is an adult or minor
- Explains every part of the syntax
- Highlights differences from Python

---

# Code Explanation

## const name = "Sepape";

Creates a constant variable called `name`.

Unlike Python, JavaScript allows you to specify whether a variable can be reassigned by using `const` or `let`.

---

## const age = 30;

Stores the user's age.

---

## function greetUser(name)

Creates a reusable function.

Python:

```python
def greet_user(name):
    return f"Welcome {name}!"
```

JavaScript:

```javascript
function greetUser(name) {
    return `Welcome ${name}!`;
}
```

---

## console.log()

Displays information in the console.

Python equivalent:

```python
print()
```

---

## if (age >= 18)

Checks whether the condition is true.

Unlike Python:

- Parentheses `()` are used around the condition.
- Curly braces `{}` define the code block.

Python example:

```python
if age >= 18:
    print("Adult")
```

JavaScript example:

```javascript
if (age >= 18) {
    console.log("Adult");
}
```

---

# Best Practices

- Use `const` when values should not change.
- Use meaningful variable names.
- Write small, reusable functions.
- Use template literals for string formatting.
- Keep your code properly indented and readable.

---

# My Key Learnings

### Learning 1

JavaScript uses `const` and `let` to manage variables, while Python simply assigns values directly.

### Learning 2

JavaScript uses curly braces (`{}`) and parentheses in control structures, whereas Python relies on indentation.

### Learning 3

`console.log()` is the JavaScript equivalent of Python's `print()` and is used for debugging and displaying output.