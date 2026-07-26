from datetime import datetime
from typing import Any


PRIORITY_SCORES = {
    "low": 10,
    "medium": 20,
    "high": 40,
    "urgent": 60,
}

COMPLETED_PENALTY = 30
OVERDUE_BONUS = 35
DUE_TODAY_BONUS = 20
DUE_SOON_BONUS = 10


def calculate_task_score(
    task: dict[str, Any],
    current_time: datetime | None = None,
) -> int:
    """Calculate a task score based on priority, status and due date."""

    current_time = current_time or datetime.now()

    priority = str(task.get("priority", "")).lower()
    score = PRIORITY_SCORES.get(priority, 0)

    if task.get("completed", False):
        score -= COMPLETED_PENALTY

    due_date_text = task.get("due_date")

    if due_date_text:
        due_date = datetime.strptime(due_date_text, "%Y-%m-%d")
        days_remaining = (due_date - current_time).days

        if days_remaining < 0:
            score += OVERDUE_BONUS
        elif days_remaining == 0:
            score += DUE_TODAY_BONUS
        elif days_remaining <= 2:
            score += DUE_SOON_BONUS

    return score


if __name__ == "__main__":
    sample_task = {
        "priority": "high",
        "completed": False,
        "due_date": "2026-07-27",
    }

    test_time = datetime(2026, 7, 26)

    result = calculate_task_score(
        sample_task,
        test_time,
    )

    print(f"Task score: {result}")