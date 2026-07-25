# AI Solution Verification Challenge

## 1. Introduction

For this exercise, I selected the scenario involving a sorting function with a subtle bug. The supplied code was an implementation of the merge sort algorithm written in JavaScript.

The purpose of the exercise was not only to ask an AI tool to correct the code, but also to verify the proposed solution using three strategies:

1. Collaborative Solution Verification
2. Learning Through Alternative Approaches
3. Developing a Critical Eye

The final solution was implemented and tested in Visual Studio Code using Node.js.

---

## 2. Original Problem

The original merge sort implementation contained the following loop:

```javascript
while (i < left.length) {
  result.push(left[i]);
  j++;
}
```

The loop is responsible for adding the remaining values from the `left` array after the main comparison loop has finished.

The bug is that the code increments `j` instead of `i`.

Because the loop condition checks `i < left.length`, incrementing `j` does not move the loop toward completion. The same value from the `left` array may continue to be added repeatedly, resulting in an infinite loop or excessive memory usage.

The incorrect statement was:

```javascript
j++;
```

The corrected statement is:

```javascript
i++;
```

---

## 3. Prompt Given to the AI

I asked the AI to review the merge sort implementation, identify the bug, explain why it caused the function to fail, provide a corrected version, identify important edge cases, and suggest ways to verify the solution.

I specifically requested an explanation rather than only asking for corrected code. This made it possible to evaluate the AI's reasoning.

---

## 4. AI-Proposed Solution

The AI correctly identified that the first remaining-elements loop incremented the wrong index.

The corrected loop was:

```javascript
while (i < left.length) {
  result.push(left[i]);
  i++;
}
```

The AI also suggested changing the main comparison from:

```javascript
left[i] < right[j]
```

to:

```javascript
left[i] <= right[j]
```

The original comparison could still sort numeric values correctly. However, using `<=` preserves the original relative ordering of equal values from the left and right sections, making the merge operation stable.

---

## 5. Verification Strategy One: Collaborative Solution Verification

I used the AI as a verification partner instead of accepting its first answer without examination.

I requested:

* An explanation of why incrementing `j` caused the loop to fail.
* A step-by-step trace of the merge operation.
* A list of possible edge cases.
* An explanation of the role of each index variable.

I manually traced the corrected merge function using:

```javascript
left = [1, 5]
right = [2, 3]
```

The merge operation produced:

```javascript
[1, 2, 3, 5]
```

During the trace, every iteration increased either `i` or `j`. This demonstrated that each loop made progress toward its termination condition.

The collaborative process helped confirm that the correction was logically connected to the loop condition.

---

## 6. Verification Strategy Two: Learning Through Alternative Approaches

I compared merge sort with insertion sort.

Insertion sort uses a different approach. Instead of dividing the array into smaller sections and merging them, it builds a sorted section by inserting each value into its correct position.

Both algorithms were tested with:

```javascript
[8, 3, 5, 1, 9, 2]
```

Both produced:

```javascript
[1, 2, 3, 5, 8, 9]
```

I also compared merge sort's output with JavaScript's built-in numeric sort:

```javascript
const expected = [...input].sort((a, b) => a - b);
```

Agreement between independently implemented approaches increased my confidence in the result.

Merge sort has an average and worst-case time complexity of `O(n log n)`. Insertion sort has an average and worst-case time complexity of `O(n²)`, although it can perform well for small or nearly sorted arrays.

This comparison helped me understand that different algorithms may produce the same correct result while using different techniques and performance trade-offs.

---

## 7. Verification Strategy Three: Developing a Critical Eye

I critically reviewed both the original code and the AI-proposed solution.

I checked the following areas:

### Loop termination

Every loop must change the variable used by its condition.

The original code checked `i` but incremented `j`. The corrected code checks and increments `i`.

### Recursive base case

The recursive function includes:

```javascript
if (arr.length <= 1)
```

This stops the recursion when a section contains zero or one item.

### Duplicate values

I tested arrays containing duplicate values to confirm that no values were lost.

### Negative values

I tested negative values to ensure comparisons worked as expected.

### Decimal values

I tested decimal numbers to confirm that the function was not limited to integers.

### Empty and single-value arrays

I tested the recursive base cases directly.

### Already sorted and reverse-sorted arrays

These tests checked two important input patterns.

### Input mutation

I confirmed that the original array remained unchanged after sorting.

### Invalid input

The verified implementation throws a `TypeError` when the input is not an array.

This review showed that a solution can appear correct for one normal example while still failing on edge cases. Testing different categories of input is therefore essential.

---

## 8. Tests Performed

The following test cases were used:

| Test                  | Input                  | Expected result                  |
| --------------------- | ---------------------- | -------------------------------- |
| Normal unsorted array | `[8, 3, 5, 1, 9, 2]`   | `[1, 2, 3, 5, 8, 9]`             |
| Empty array           | `[]`                   | `[]`                             |
| Single value          | `[7]`                  | `[7]`                            |
| Already sorted        | `[1, 2, 3, 4, 5]`      | `[1, 2, 3, 4, 5]`                |
| Reverse sorted        | `[5, 4, 3, 2, 1]`      | `[1, 2, 3, 4, 5]`                |
| Duplicates            | `[4, 2, 4, 1, 2, 4]`   | `[1, 2, 2, 4, 4, 4]`             |
| Negative values       | `[-3, 5, -1, 0, 2]`    | `[-3, -1, 0, 2, 5]`              |
| Decimal values        | `[2.5, 1.1, 3.7, 0.5]` | `[0.5, 1.1, 2.5, 3.7]`           |
| Input mutation        | `[3, 1, 2]`            | Original array remains unchanged |
| Invalid input         | `"3, 2, 1"`            | `TypeError`                      |

All tests passed after the bug was corrected.

---

## 9. Final Verified Solution

```javascript
function mergeSort(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("mergeSort expects an array.");
  }

  if (arr.length <= 1) {
    return [...arr];
  }

  const mid = Math.floor(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];

  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

module.exports = {
  mergeSort,
  merge,
};
```

---

## 10. Reflection Questions

### How did your confidence in the solution change after verification?

My initial confidence was moderate because the AI identified a clear index error and provided a correction that appeared reasonable. However, I did not consider the solution fully reliable until I traced the algorithm manually and ran several automated tests.

My confidence increased significantly after the corrected function passed normal cases, edge cases, duplicate-value tests, negative-number tests, decimal-number tests, and input-mutation tests. Comparing the result with insertion sort and JavaScript's built-in numeric sort also provided independent confirmation.

The verification process showed me that confidence should be based on evidence rather than on how convincing an AI explanation sounds.

### What aspects of the AI solution required the most scrutiny?

The loop variables required the most scrutiny because the bug was caused by a mismatch between the loop condition and the variable being incremented.

I also carefully reviewed the change from `<` to `<=`. The original comparison could still produce a correctly sorted numeric array, so I needed to understand that the suggested change mainly improved sorting stability rather than fixing the infinite loop.

Input assumptions also required scrutiny. The algorithm assumes that it receives an array containing values that can be compared consistently. I added validation for non-array input, but a production implementation might also need to support custom comparison functions or objects.

### Which verification technique was most valuable for your specific problem?

Developing a Critical Eye was the most valuable technique for this problem.

The defect was very small: only one incorrect variable was incremented. The code looked almost correct, making the bug easy to overlook. By checking whether every loop changed the variable used in its condition, I could identify the exact cause of the failure.

Automated edge-case tests were also highly valuable because they provided repeatable evidence that the corrected function worked for different input categories.

---

## 11. What I Learned

I learned that AI-generated solutions should not be accepted without verification.

A solution should be checked by:

* Understanding the explanation.
* Tracing the logic manually.
* Testing normal and unusual inputs.
* Comparing the result with an alternative implementation.
* Reviewing termination conditions and assumptions.
* Checking whether the original input is changed.
* Confirming that every value is retained.
* Evaluating whether additional AI suggestions are necessary or merely improvements.

The exercise also improved my understanding of merge sort. Merge sort divides an array recursively, sorts the smaller sections, and then combines them using a merge function. Its performance is generally `O(n log n)`, which makes it suitable for larger datasets.

The most important lesson is that AI can assist with problem-solving, but the developer remains responsible for evaluating and verifying the final solution.
