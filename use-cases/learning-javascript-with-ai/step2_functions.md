# Part 2 - Step 2: Step-by-Step Breakdown

## Prompt Used

I want to understand functions in JavaScript.

Could you explain:

1. How functions are implemented in JavaScript.
2. How they compare to Python functions.
3. The key syntax and structures I need to understand.
4. Common patterns and best practices.

Let's focus on concepts before writing complex code.

---

# Python Function Example

```python
def greet(name):
    return f"Hello {name}"

print(greet("Sepape"))
```

### Output

```
Hello Sepape
```

---

# JavaScript Function Example

```javascript
function greet(name) {
    return `Hello ${name}`;
}

console.log(greet("Sepape"));
```

### Output

```
Hello Sepape
```

---

# Comparison

| Python | JavaScript |
|---------|------------|
| def | function |
| print() | console.log() |
| Indentation defines blocks | Curly braces {} define blocks |
| Uses f-strings | Uses template literals |
| No semicolon required | Semicolons are commonly used |

---

# JavaScript Syntax Explained

## function greet(name)

Creates a function named **greet**.

## return

Returns a value back to whoever called the function.

## `Hello ${name}`

A template literal that inserts the value of the variable into the string.

## console.log()

Displays output in the browser console or terminal.

---

# JavaScript Best Practices

- Use meaningful function names.
- Keep functions small and focused.
- Prefer `const` for variables that do not change.
- Use template literals instead of string concatenation.
- Write reusable functions.
---

# My Key Learnings

### Learning 1

JavaScript functions are declared using the `function` keyword, whereas Python uses `def`.

### Learning 2

JavaScript uses curly braces (`{}`) to define code blocks, while Python relies on indentation.

### Learning 3

JavaScript template literals (`` `Hello ${name}` ``) provide a convenient way to build strings, similar to Python f-strings.