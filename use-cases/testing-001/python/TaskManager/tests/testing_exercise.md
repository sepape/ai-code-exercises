# Exercise: Using AI to Help with Testing

## Language and tools

* Language: Python
* Editor: Visual Studio Code
* Testing framework: Python unittest
* Functions tested:

  * `calculate_task_score`
  * `sort_tasks_by_importance`
  * `get_top_priority_tasks`

# Part 1: Understanding What to Test

## Exercise 1.1: Behaviour Analysis

### What the function does

The `calculate_task_score` function calculates the importance of a task by assigning points based on several task properties.

The function considers:

* The task priority
* The task due date
* The task status
* The task tags
* The date and time when the task was last updated

A task with a higher final score is considered more important.

### Priority scores

The base scores are:

* Low priority: 10 points
* Medium priority: 20 points
* High priority: 40 points
* Urgent priority: 60 points
* Unknown priority: 0 points

### Due-date scores

The function adds:

* 35 points when a task is overdue
* 20 points when a task is due today
* 15 points when a task is due within two days
* 10 points when a task is due within seven days
* No due-date points when the task is due more than seven days away
* No due-date points when the task has no due date

### Status adjustments

The function subtracts:

* 50 points when the task status is `DONE`
* 15 points when the task status is `REVIEW`

Other statuses do not reduce the score.

### Tag adjustment

The function adds 8 points when the task contains at least one of these tags:

* `blocker`
* `critical`
* `urgent`

The 8-point increase is added only once, even when the task has several important tags.

### Recently updated adjustment

The function adds 5 points when the task was updated less than one day ago.

### Behaviours that should be tested

1. Every valid priority produces the correct base score.
2. An unknown priority produces a base score of zero.
3. An overdue task receives 35 additional points.
4. A task due today receives 20 additional points.
5. A task due within two days receives 15 additional points.
6. A task due within seven days receives 10 additional points.
7. A task due more than seven days away receives no due-date bonus.
8. A task without a due date does not cause an error.
9. A completed task loses 50 points.
10. A task in review loses 15 points.
11. An important tag adds 8 points.
12. Several important tags still add only 8 points.
13. A recently updated task receives 5 points.
14. All applicable score adjustments are combined correctly.

### Edge cases

1. A task has no due date.
2. A task has an empty tag list.
3. A task has an unknown priority.
4. A task is due exactly two days from now.
5. A task is due exactly seven days from now.
6. A task was updated exactly one day ago.
7. A completed task has a negative final score.
8. A task contains several important tags.
9. An empty list is passed to the sorting function.
10. A limit of zero is passed to `get_top_priority_tasks`.

### Initial test cases

#### Test 1: Medium-priority base score

Create a medium-priority task without a due date, important tags, status reduction, or recent update.

Expected result: 20 points.

#### Test 2: Urgent overdue task

Create an urgent task with a due date in the past.

Expected result before other factors:

* Urgent priority: 60
* Overdue bonus: 35
* Total: 95

#### Test 3: High-priority task due today

Create a high-priority task due today.

Expected result before other factors:

* High priority: 40
* Due-today bonus: 20
* Total: 60

#### Test 4: Completed medium-priority task

Create a medium-priority task with status `DONE`.

Expected result before other factors:

* Medium priority: 20
* Completed deduction: -50
* Total: -30

#### Test 5: Low-priority task with a critical tag

Create a low-priority task with the tag `critical`.

Expected result before other factors:

* Low priority: 10
* Critical-tag bonus: 8
* Total: 18

#### Test 6: Recently updated low-priority task

Create a low-priority task updated less than one day ago.

Expected result:

* Low priority: 10
* Recent-update bonus: 5
* Total: 15

#### Test 7: Several important tags

Create a task with `blocker`, `critical`, and `urgent` tags.

Expected result: Only one 8-point bonus should be added.

#### Test 8: Boundary due dates

Test tasks due exactly two days and exactly seven days from now.

Expected results:

* Exactly two days: 15-point bonus
* Exactly seven days: 10-point bonus

### Test that should be written first

The medium-priority base-score test should be written first.

It verifies the basic priority calculation without due dates, status deductions, important tags, or recent-update bonuses. This makes failures easier to understand.

## Exercise 1.2: Test Plan

### Testing levels

Two types of tests will be used:

1. Unit tests
2. Integration tests

Unit tests will test `calculate_task_score` independently.

Integration tests will test the workflow involving:

- `calculate_task_score`
- `sort_tasks_by_importance`
- `get_top_priority_tasks`

### High-priority tests

| Test | Type | Expected outcome |
|---|---|---|
| Medium priority base score | Unit | Score equals 20 |
| Overdue bonus | Unit | 35 points are added |
| Due today bonus | Unit | 20 points are added |
| Completed-task deduction | Unit | 50 points are subtracted |
| Important-tag bonus | Unit | 8 points are added |
| Recently updated bonus | Unit | 5 points are added |
| Sorting workflow | Integration | Highest-scoring task appears first |
| Top-priority limit | Integration | Only the requested number of tasks is returned |

### Medium-priority tests

| Test | Type | Expected outcome |
|---|---|---|
| Due in exactly two days | Unit | 15 points are added |
| Due in exactly seven days | Unit | 10 points are added |
| Review status | Unit | 15 points are subtracted |
| Several important tags | Unit | Only 8 points are added |
| Unknown priority | Unit | Base score equals zero |
| Empty task list | Integration | An empty list is returned |

### Lower-priority tests

| Test | Type | Expected outcome |
|---|---|---|
| Limit greater than list size | Integration | All available tasks are returned |
| Limit equal to zero | Integration | An empty list is returned |
| Equal task scores | Integration | All tasks are returned without errors |

### Test dependencies

The tests depend on:

- `TaskPriority`
- `TaskStatus`
- The task-priority functions
- Python's `datetime`
- Python's `unittest`
- `unittest.mock.patch`

The tests should not depend on the real current time. The current time will be replaced with a fixed value during testing.

### Testing order

1. Test the basic priority score.
2. Test individual due-date rules.
3. Test status deductions.
4. Test tag bonuses.
5. Test recently updated tasks.
6. Test combined score calculations.
7. Test sorting.
8. Test the top-task limit.
9. Test the complete workflow.

## Part 2: Improving a Single Test

### Exercise 2.1: Improving the first test

My first test verified that a medium-priority task returned a score of 20.

The original test was useful, but it depended on the real current time. This could make the result unpredictable if the task's update time was close to the one-day boundary.

I improved the test by:

- Using a fixed current date and time
- Giving the test a descriptive name
- Separating task creation into a helper function
- Using a precise expected score
- Adding a useful assertion message
- Making sure no unrelated scoring factors affected the test

The improved test checks observable behaviour rather than internal implementation details.