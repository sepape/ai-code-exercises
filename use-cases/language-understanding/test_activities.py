from datetime import datetime

import pytest

from activity1_idiomatic_code import calculate_task_score
from activity2_code_quality import find_tasks
from activity3_decorators import create_task


def test_high_priority_task_due_soon() -> None:
    task = {
        "priority": "high",
        "completed": False,
        "due_date": "2026-07-27",
    }

    result = calculate_task_score(
        task,
        current_time=datetime(2026, 7, 26),
    )

    assert result == 50


def test_completed_task_receives_penalty() -> None:
    task = {
        "priority": "medium",
        "completed": True,
        "due_date": None,
    }

    result = calculate_task_score(
        task,
        current_time=datetime(2026, 7, 26),
    )

    assert result == -10


def test_find_tasks_excludes_completed_tasks() -> None:
    tasks = [
        {
            "title": "Open task",
            "description": "Still active",
            "priority": "high",
            "completed": False,
        },
        {
            "title": "Closed task",
            "description": "Already completed",
            "priority": "urgent",
            "completed": True,
        },
    ]

    result = find_tasks(
        tasks,
        show_completed=False,
    )

    assert len(result) == 1
    assert result[0]["title"] == "Open task"


def test_find_tasks_searches_descriptions() -> None:
    tasks = [
        {
            "title": "Investigate issue",
            "description": "Fix the login page",
            "priority": "urgent",
            "completed": False,
        },
        {
            "title": "Write report",
            "description": "Prepare monthly figures",
            "priority": "medium",
            "completed": False,
        },
    ]

    result = find_tasks(
        tasks,
        search="login",
    )

    assert len(result) == 1
    assert result[0]["title"] == "Investigate issue"


def test_create_task_normalizes_priority() -> None:
    result = create_task(
        title="Complete exercise",
        priority=" HIGH ",
    )

    assert result == {
        "title": "Complete exercise",
        "priority": "high",
    }


def test_create_task_rejects_empty_title() -> None:
    with pytest.raises(ValueError):
        create_task(
            title="",
            priority="high",
        )