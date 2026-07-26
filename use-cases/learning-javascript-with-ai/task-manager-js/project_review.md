# Part 4 - Project Review and Refactoring

## Prompt Used

I've completed my JavaScript Task Manager project.

The project uses HTML, CSS, JavaScript, DOM manipulation, events, arrays, objects, and Local Storage.

Could you:

1. Review the code for JavaScript idioms and best practices.
2. Suggest refactoring opportunities to make it more idiomatic.
3. Identify any remaining Python patterns I should adjust.
4. Recommend the next steps for improving my JavaScript skills.

---

## AI Review

### JavaScript Best Practices Followed

The project follows several good JavaScript practices:

- Uses `const` for references that do not change.
- Uses `let` only when the tasks array must be reassigned.
- Uses meaningful function and variable names.
- Uses objects to represent tasks.
- Uses array methods such as `forEach`, `map`, and `filter`.
- Uses event listeners instead of inline JavaScript.
- Uses template-independent DOM manipulation.
- Uses Local Storage to preserve task data.
- Validates empty user input.
- Handles invalid saved data with `try...catch`.

### Refactoring Opportunities

The project could be improved by:

- Separating storage logic from display logic.
- Moving the storage key into a constant.
- Creating a function for clearing the input field.
- Creating a function for displaying error messages.
- Adding task-editing functionality.
- Adding confirmation before deleting a task.
- Adding filters for all, active, and completed tasks.
- Adding automated tests.

### Python Patterns to Adjust

Possible Python habits include:

- Writing code as one long procedural script.
- Expecting the application to run from top to bottom only once.
- Not thinking in terms of browser events.
- Avoiding JavaScript array methods and using manual loops instead.
- Treating JavaScript objects exactly like Python dictionaries.

### Recommended Next Steps

The next topics to learn are:

- JavaScript modules
- Classes
- Promises
- Async/Await
- Fetch API
- REST API integration
- Node.js
- Express
- React
- JavaScript testing

---

## Refactoring Completed

I created a constant called `STORAGE_KEY` for the Local Storage key.

Before refactoring:

```javascript
localStorage.setItem("tasks", JSON.stringify(tasks));
localStorage.getItem("tasks");