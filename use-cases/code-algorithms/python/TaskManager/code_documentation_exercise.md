# Exercise: Code Documentation

## 1. Selected Code
I selected the Task Priority Score Algorithm because it is one of the more complex algorithms in the project. It calculates a priority score for each task based on priority, due date, status, tags and recent activity.

## 2. Original Code
```python

def calculate_task_score(task):
    """Calculate a priority score for a task based on multiple factors."""
    # Base priority weights
    priority_weights = {
        TaskPriority.LOW: 1,
        TaskPriority.MEDIUM: 2,
        TaskPriority.HIGH: 4,
        TaskPriority.URGENT: 6
    }

    # Calculate base score from priority
    score = priority_weights.get(task.priority, 0) * 10

    # Add due date factor (higher score for tasks due sooner)
    if task.due_date:
        days_until_due = (task.due_date - datetime.now()).days

        if days_until_due < 0:
            score += 35
        elif days_until_due == 0:
            score += 20
        elif days_until_due <= 2:
            score += 15
        elif days_until_due <= 7:
            score += 10

    # Reduce score for tasks that are completed or in review
    if task.status == TaskStatus.DONE:
        score -= 50
    elif task.status == TaskStatus.REVIEW:
        score -= 15

    # Boost score for tasks with certain tags
    if any(tag in ["blocker", "critical", "urgent"] for tag in task.tags):
        score += 8

    # Boost score for recently updated tasks
    days_since_update = (datetime.now() - task.updated_at).days

    if days_since_update < 1:
        score += 5

    return score


def sort_tasks_by_importance(tasks):
    """Sort tasks by calculated importance score (highest first)."""
    task_scores = [(calculate_task_score(task), task) for task in tasks]
    sorted_tasks = [
        task for _, task in sorted(task_scores, reverse=True)
    ]
    return sorted_tasks


def get_top_priority_tasks(tasks, limit=5):
    """Return the top N priority tasks."""
    sorted_tasks = sort_tasks_by_importance(tasks)
    return sorted_tasks[:limit]

 ```

## 3. Prompt 1


 ````text
Please create comprehensive documentation for these Python functions following Python docstring conventions.

The documentation should include:

1. A clear description of what the function does.
2. All parameters with types and descriptions.
3. Return value with type and description.
4. Any exceptions or errors that might occur.
5. Example usage.
6. Important notes and edge cases.

 ``` 
## 4. Documentation Generated Using Prompt 1
def calculate_task_score(task):
    """
    Calculate the relative importance score of a task.

    Args:
        task (Task):
            Task to evaluate.

    Returns:
        int:
            The calculated score.

    Raises:
        AttributeError:
            If the task is missing required attributes.

    Notes:
        Higher scores indicate more important tasks.
    """
## 5. Prompt 2
I need help documenting the intent and logic behind this code.

Please explain:

1. What the code is trying to accomplish.
2. The logic step-by-step.
3. Assumptions.
4. Edge cases.
5. Possible improvements.
## 6. Insights From Prompt 2
The algorithm creates a numerical score that represents the importance of each task.

The score is calculated by:

• checking the priority level
• checking the due date
• checking the task status
• checking important tags
• checking whether the task was recently updated

Possible edge cases include:

• missing task attributes
• invalid dates
• equal task scores
• case-sensitive tags
• negative limit values
## 7. Final Combined Documentation
This exercise showed me how AI can quickly generate useful documentation for existing code.

Prompt 1 helped create professional Python docstrings.

Prompt 2 explained the purpose and logic of the algorithm.

Combining both prompts produced better documentation than using only one prompt.

I also learned that AI-generated documentation should always be reviewed for correctness before being added to a project.
## 8. What I Learned







