# Part 3 - Advanced Prompting Techniques

---

# Technique 1 - Using Context Effectively

## Prompt Used

I'm learning JavaScript functions coming from Python functions.

Could you explain JavaScript functions by comparing them to concepts I'm already familiar with in Python?
### AI Response

Python and JavaScript both use functions to organize reusable code.

Similarities:

- Both allow parameters.
- Both can return values.
- Both support reusable logic.

Differences:

Python:

```python
def greet(name):
    return f"Hello {name}"
```

JavaScript:

```javascript
function greet(name) {
    return `Hello ${name}`;
}
```

JavaScript also supports:

- Arrow functions
- Anonymous functions
- Callback functions

These are used extensively in web development.

### My Learnings

- JavaScript functions are more flexible because they can be passed around as values.
- Arrow functions provide a shorter syntax for many use cases.
- Callback functions are commonly used in event-driven programming.

---

# Technique 2 - Promoting Deep Understanding

## Prompt Used

I've implemented this JavaScript solution:

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

Could you help me understand:

1. Performance implications
2. Alternative approaches
3. How this changes if the application scales
4. Better JavaScript practices

### AI Response

Performance

- This program performs well because it is small.

Alternative Approaches

- Arrow functions
- JavaScript classes
- Modules

If the application grows

- Split code into multiple files.
- Separate business logic from presentation.
- Use reusable components.

Better Practices

- Validate user input.
- Avoid global variables.
- Use modern JavaScript features.

### My Learnings

- Small programs can use simple functions, but larger applications benefit from modular code.
- Separating concerns makes code easier to maintain.
- Planning for scalability early helps keep projects organized.

---

# Technique 3 - Learning Through Teaching

## Prompt Used

Could you verify my understanding?

Here's how I would explain JavaScript functions to another developer:

"Functions are reusable blocks of code similar to Python functions. JavaScript also supports arrow functions and anonymous functions."

What am I missing?

### AI Response

Your explanation is mostly correct.

You should also mention:

- Callback functions
- First-class functions
- Closures
- Higher-order functions

### My Learnings

- JavaScript treats functions as values.
- Functions can be passed into other functions.
- Closures are an important JavaScript concept that differs from Python.

---

# Technique 4 - Using AI as a Tutor

## Prompt Used

I'd like you to be my JavaScript tutor as I learn it coming from Python.

Instead of giving direct answers, please:

- Ask me guiding questions
- Break down difficult concepts
- Give hints
- Point out Python habits
- Correct misunderstandings gently

Let's begin by understanding JavaScript objects.
### AI Tutor Response

Question:

How would you store information about a person in Python?

Expected Answer

Using a dictionary.

Now compare it to JavaScript.

Python

```python
person = {
    "name": "Sepape",
    "age": 30
}
```

JavaScript

```javascript
const person = {
    name: "Sepape",
    age: 30
};
```

Notice that JavaScript object keys do not require quotation marks unless necessary.

### My Learnings

- JavaScript objects are similar to Python dictionaries.
- Learning through questions encourages deeper understanding.
- Comparing familiar concepts from Python makes JavaScript easier to learn.