from collections.abc import Callable
from functools import wraps
from time import perf_counter
from typing import Any, TypeVar


ReturnType = TypeVar("ReturnType")


def log_execution(
    function: Callable[..., ReturnType],
) -> Callable[..., ReturnType]:
    """Log when the decorated function starts and finishes."""

    @wraps(function)
    def wrapper(
        *args: Any,
        **kwargs: Any,
    ) -> ReturnType:
        print(f"Starting: {function.__name__}")

        try:
            result = function(*args, **kwargs)
        except Exception as error:
            print(
                f"Failed: {function.__name__}: "
                f"{type(error).__name__}: {error}"
            )
            raise

        print(f"Completed: {function.__name__}")
        return result

    return wrapper


def measure_time(
    function: Callable[..., ReturnType],
) -> Callable[..., ReturnType]:
    """Measure and display a function's execution time."""

    @wraps(function)
    def wrapper(
        *args: Any,
        **kwargs: Any,
    ) -> ReturnType:
        start_time = perf_counter()

        try:
            return function(*args, **kwargs)
        finally:
            elapsed_time = perf_counter() - start_time
            print(
                f"{function.__name__} took "
                f"{elapsed_time:.6f} seconds"
            )

    return wrapper


@log_execution
@measure_time
def create_task(
    title: str,
    priority: str,
) -> dict[str, str]:
    """Create and return a task dictionary."""

    if not title.strip():
        raise ValueError("The task title cannot be empty.")

    valid_priorities = {
        "low",
        "medium",
        "high",
        "urgent",
    }

    normalized_priority = priority.strip().lower()

    if normalized_priority not in valid_priorities:
        raise ValueError(
            f"Invalid priority: {priority}"
        )

    return {
        "title": title.strip(),
        "priority": normalized_priority,
    }


if __name__ == "__main__":
    task = create_task(
        title="Complete Python exercise",
        priority="high",
    )

    print(task)