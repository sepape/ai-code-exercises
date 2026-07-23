from dataclasses import dataclass, field
from datetime import datetime, timedelta
from enum import Enum


class TaskPriority(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class TaskStatus(Enum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    REVIEW = "review"
    DONE = "done"


@dataclass
class Task:
    title: str
    priority: TaskPriority = TaskPriority.MEDIUM
    status: TaskStatus = TaskStatus.TODO
    due_date: datetime | None = None
    tags: list[str] = field(default_factory=list)
    updated_at: datetime = field(default_factory=datetime.now)


def calculate_task_score(task):
    """Calculate a priority score for a task based on multiple factors."""

    priority_weights = {
        TaskPriority.LOW: 1,
        TaskPriority.MEDIUM: 2,
        TaskPriority.HIGH: 4,
        TaskPriority.URGENT: 6,
    }

    score = priority_weights.get(task.priority, 0) * 10

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

    if task.status == TaskStatus.DONE:
        score -= 50
    elif task.status == TaskStatus.REVIEW:
        score -= 15

    if any(tag in ["blocker", "critical", "urgent"] for tag in task.tags):
        score += 8

    days_since_update = (datetime.now() - task.updated_at).days

    if days_since_update < 1:
        score += 5

    return score


def sort_tasks_by_importance(tasks):
    """Sort tasks by calculated importance score, highest first."""

    return sorted(
        tasks,
        key=calculate_task_score,
        reverse=True,
    )


def get_top_priority_tasks(tasks, limit=5):
    """Return the top N priority tasks."""

    sorted_tasks = sort_tasks_by_importance(tasks)
    return sorted_tasks[:limit]


now = datetime.now()

tasks = [
    Task(
        title="Fix production server",
        priority=TaskPriority.URGENT,
        status=TaskStatus.IN_PROGRESS,
        due_date=now - timedelta(days=1),
        tags=["blocker"],
        updated_at=now,
    ),
    Task(
        title="Finish monthly report",
        priority=TaskPriority.HIGH,
        status=TaskStatus.IN_PROGRESS,
        due_date=now + timedelta(days=2),
        tags=["work"],
        updated_at=now - timedelta(days=3),
    ),
    Task(
        title="Submit completed design",
        priority=TaskPriority.URGENT,
        status=TaskStatus.DONE,
        due_date=now,
        tags=["urgent"],
        updated_at=now,
    ),
]

print("TASK SCORES")
print("-" * 50)

for task in tasks:
    print(f"{task.title}: {calculate_task_score(task)}")

print("\nSORTED TASKS")
print("-" * 50)

for position, task in enumerate(sort_tasks_by_importance(tasks), start=1):
    print(
        f"{position}. {task.title} "
        f"(score: {calculate_task_score(task)})"
    )

print("\nTOP TWO TASKS")
print("-" * 50)

for task in get_top_priority_tasks(tasks, limit=2):
    print(task.title)