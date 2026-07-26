const test = require("node:test");
const assert = require("node:assert/strict");

const {
  calculateShippingCost: calculateOriginalShippingCost,
} = require("./shipping");

const {
  calculateShippingCost: calculateRefactoredShippingCost,
} = require("./shippingStrategy");

const normalPackage = {
  weight: 5,
  length: 10,
  width: 10,
  height: 10,
};

test("standard shipping to USA returns the original result", () => {
  const originalResult = calculateOriginalShippingCost(
    normalPackage,
    "USA",
    "standard"
  );

  const refactoredResult = calculateRefactoredShippingCost(
    normalPackage,
    "USA",
    "standard"
  );

  assert.equal(originalResult, "12.50");
  assert.equal(refactoredResult, originalResult);
});

test("standard shipping to Canada returns the original result", () => {
  const originalResult = calculateOriginalShippingCost(
    normalPackage,
    "Canada",
    "standard"
  );

  const refactoredResult = calculateRefactoredShippingCost(
    normalPackage,
    "Canada",
    "standard"
  );

  assert.equal(originalResult, "17.50");
  assert.equal(refactoredResult, originalResult);
});

test("standard shipping applies dimensional surcharge", () => {
  const largeLightPackage = {
    weight: 1,
    length: 20,
    width: 10,
    height: 10,
  };

  const originalResult = calculateOriginalShippingCost(
    largeLightPackage,
    "USA",
    "standard"
  );

  const refactoredResult = calculateRefactoredShippingCost(
    largeLightPackage,
    "USA",
    "standard"
  );

  assert.equal(originalResult, "7.50");
  assert.equal(refactoredResult, originalResult);
});

test("express shipping to Canada returns the original result", () => {
  const originalResult = calculateOriginalShippingCost(
    normalPackage,
    "Canada",
    "express"
  );

  const refactoredResult = calculateRefactoredShippingCost(
    normalPackage,
    "Canada",
    "express"
  );

  assert.equal(originalResult, "27.50");
  assert.equal(refactoredResult, originalResult);
});

test("express shipping applies large-package surcharge", () => {
  const largePackage = {
    weight: 5,
    length: 20,
    width: 20,
    height: 20,
  };

  const originalResult = calculateOriginalShippingCost(
    largePackage,
    "USA",
    "express"
  );

  const refactoredResult = calculateRefactoredShippingCost(
    largePackage,
    "USA",
    "express"
  );

  assert.equal(originalResult, "37.50");
  assert.equal(refactoredResult, originalResult);
});

test("overnight shipping to USA returns the original result", () => {
  const originalResult = calculateOriginalShippingCost(
    normalPackage,
    "USA",
    "overnight"
  );

  const refactoredResult = calculateRefactoredShippingCost(
    normalPackage,
    "USA",
    "overnight"
  );

  assert.equal(originalResult, "47.50");
  assert.equal(refactoredResult, originalResult);
});

test("overnight shipping rejects unsupported destinations", () => {
  const originalResult = calculateOriginalShippingCost(
    normalPackage,
    "Mexico",
    "overnight"
  );

  const refactoredResult = calculateRefactoredShippingCost(
    normalPackage,
    "Mexico",
    "overnight"
  );

  assert.equal(
    originalResult,
    "Overnight shipping not available for this destination"
  );

  assert.equal(refactoredResult, originalResult);
});

test("international standard shipping uses the default rate", () => {
  const originalResult = calculateOriginalShippingCost(
    normalPackage,
    "South Africa",
    "standard"
  );

  const refactoredResult = calculateRefactoredShippingCost(
    normalPackage,
    "South Africa",
    "standard"
  );

  assert.equal(originalResult, "22.50");
  assert.equal(refactoredResult, originalResult);
});

test("unknown shipping method preserves the original result", () => {
  const originalResult = calculateOriginalShippingCost(
    normalPackage,
    "USA",
    "same-day"
  );

  const refactoredResult = calculateRefactoredShippingCost(
    normalPackage,
    "USA",
    "same-day"
  );

  assert.equal(originalResult, "0.00");
  assert.equal(refactoredResult, originalResult);
});