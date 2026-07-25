const assert = require("node:assert/strict");
const { mergeSort, merge } = require("./mergeSort");

function runTest(testName, testFunction) {
  try {
    testFunction();
    console.log(`PASS: ${testName}`);
  } catch (error) {
    console.error(`FAIL: ${testName}`);
    console.error(error.message);
    process.exitCode = 1;
  }
}

runTest("sorts an unsorted array", () => {
  const actual = mergeSort([8, 3, 5, 1, 9, 2]);
  const expected = [1, 2, 3, 5, 8, 9];

  assert.deepEqual(actual, expected);
});

runTest("handles an empty array", () => {
  assert.deepEqual(mergeSort([]), []);
});

runTest("handles a single value", () => {
  assert.deepEqual(mergeSort([7]), [7]);
});

runTest("handles an already sorted array", () => {
  const actual = mergeSort([1, 2, 3, 4, 5]);
  const expected = [1, 2, 3, 4, 5];

  assert.deepEqual(actual, expected);
});

runTest("handles a reverse-sorted array", () => {
  const actual = mergeSort([5, 4, 3, 2, 1]);
  const expected = [1, 2, 3, 4, 5];

  assert.deepEqual(actual, expected);
});

runTest("handles duplicate values", () => {
  const actual = mergeSort([4, 2, 4, 1, 2, 4]);
  const expected = [1, 2, 2, 4, 4, 4];

  assert.deepEqual(actual, expected);
});

runTest("handles negative numbers", () => {
  const actual = mergeSort([-3, 5, -1, 0, 2]);
  const expected = [-3, -1, 0, 2, 5];

  assert.deepEqual(actual, expected);
});

runTest("handles decimal numbers", () => {
  const actual = mergeSort([2.5, 1.1, 3.7, 0.5]);
  const expected = [0.5, 1.1, 2.5, 3.7];

  assert.deepEqual(actual, expected);
});

runTest("does not modify the original array", () => {
  const original = [3, 1, 2];
  const originalCopy = [...original];

  mergeSort(original);

  assert.deepEqual(original, originalCopy);
});

runTest("merges two sorted arrays", () => {
  const actual = merge([1, 4, 7], [2, 3, 8]);
  const expected = [1, 2, 3, 4, 7, 8];

  assert.deepEqual(actual, expected);
});

runTest("throws an error for non-array input", () => {
  assert.throws(
    () => mergeSort("3, 2, 1"),
    TypeError
  );
});