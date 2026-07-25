import unittest
from datetime import datetime, timedelta
from types import SimpleNamespace

from models import TaskPriority

from task_priority import calculate_task_score


class TestCalculateTaskScoreSimple(unittest.TestCase):

    def test_medium_priority_task(self):
        task = SimpleNamespace(
            priority=TaskPriority.MEDIUM,
            due_date=None,
            status="OPEN",
            tags=[],
            updated_at=datetime.now() - timedelta(days=2),
        )

        result = calculate_task_score(task)

        self.assertEqual(result, 20)


if __name__ == "__main__":
    unittest.main()