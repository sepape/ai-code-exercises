from typing import Any


PRIORITY_ORDER = {
    "low": 1,
    "medium": 2,
    "high": 3,
    "urgent": 4,
}


def task_matches_search(
    task: dict[str, Any],
    search_term: str,
) -> bool:
    """Return True when the search term appears in the task."""

    if not search_term:
        return True

    title = str(task.get("title", "")).lower()
    description = str(task.get("description", "")).lower()

    return search_term in title or search_term in description


def find_tasks(
    tasks: list[dict[str, Any]],
    search: str = "",
    show_completed: bool = True,
) -> list[dict[str, Any]]:
    """Filter and sort tasks according to the supplied criteria."""

    search_term = search.strip().lower()

    filtered_tasks = [
        task
        for task in tasks
        if (show_completed or not task.get("completed", False))
        and task_matches_search(task, search_term)
    ]

    return sorted(
        filtered_tasks,
        key=lambda task: PRIORITY_ORDER.get(
            str(task.get("priority", "")).lower(),
            0,
        ),
        reverse=True,
    )


if __name__ == "__main__":
    sample_tasks = [
        {
            "title": "Prepare report",
            "description": "Complete the monthly report",
            "priority": "high",
            "completed": False,
        },
        {
            "title": "Buy stationery",
            "description": "Purchase notebooks",
            "priority": "low",
            "completed": True,
        },
        {
            "title": "Fix login error",
            "description": "Investigate authentication problem",
            "priority": "urgent",
            "completed": False,
        },
    ]

    matching_tasks = find_tasks(
        sample_tasks,
        search="report",
        show_completed=False,
    )

    for task in matching_tasks:
        print(task["title"])