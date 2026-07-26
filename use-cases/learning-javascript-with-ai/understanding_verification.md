# Part 2 - Step 4: Understanding Verification

## Prompt Used

I've created this JavaScript implementation:

```javascript
const name = "Sepape";
const age = 30;

function greetUser(name) {
    return `Welcome ${name}!`;
}

console.log(greetUser(name));

if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}
```

Could you:

1. Verify if I've followed JavaScript best practices?
2. Explain any improvements I should make.
3. Suggest what I should learn next.
4. Point out any Python habits that might be showing in my code.
---

# AI Review

## 1. Best Practices

The code follows several JavaScript best practices:

- Uses `const` for variables that do not change.
- Uses a reusable function.
- Uses template literals.
- Has meaningful variable names.
- Code is properly indented.

Overall, the code is clean and easy to read.

## 2. Suggested Improvements

Although the code is correct, it could be improved by:

- Accepting user input instead of using hard-coded values.
- Splitting logic into smaller functions.
- Adding comments only where they improve understanding.
- Validating input values before processing them.

## 3. What I Should Learn Next

The next JavaScript topics to study are:

- Arrays
- Objects
- Loops
- DOM Manipulation
- Events
- Fetch API
- Promises
- Async/Await

## 4. Python Habits I Should Avoid

Some Python habits that may appear in JavaScript code include:

- Writing very procedural code instead of using JavaScript objects.
- Forgetting that JavaScript is event-driven.
- Expecting synchronous execution instead of understanding asynchronous programming.
- Not taking advantage of modern JavaScript features like arrow functions.

---

# Improved Version

```javascript
const user = {
    name: "Sepape",
    age: 30
};

function greetUser(user) {
    console.log(`Welcome ${user.name}!`);

    if (user.age >= 18) {
        console.log("You are an adult.");
    } else {
        console.log("You are a minor.");
    }
}

greetUser(user);
```

---

# Why This Version Is Better

- Uses an object to group related data.
- Makes the function easier to reuse.
- Demonstrates a common JavaScript programming style.
- Better prepares the code for larger applications.

---

# My Key Learnings

### Learning 1

Using objects to group related information makes JavaScript code easier to maintain and extend.

### Learning 2

JavaScript encourages reusable functions and object-based design rather than relying on many separate variables.

### Learning 3

Modern JavaScript features such as template literals and objects make code cleaner and more expressive.