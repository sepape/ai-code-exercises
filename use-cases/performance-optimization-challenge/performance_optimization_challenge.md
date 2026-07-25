# Performance Optimization Challenge

## 1. Scenario Selected

I selected the Slow Code Analysis scenario using Python.

The program finds pairs of products whose combined price falls within a target price range.

The application normally processes approximately 5,000 products.

---

## 2. Performance Problem

The original function was slow because it used two nested loops.

For every product, the function compared it with every other product.

For 5,000 products, the program could perform approximately:

```text
5,000 × 5,000 = 25,000,000 comparisons
```

The original function also used `any()` to search through the results list each time it found a valid product pair.

As the results list became larger, the duplicate check became increasingly expensive.

---

## 3. Main Bottlenecks Identified

### Nested loops

The original code used:

```python
for i in range(len(products)):
    for j in range(len(products)):
```

This compares every product against every other product.

### Duplicate comparisons

The program checked both:

```text
Product A + Product B
```

and:

```text
Product B + Product A
```

These represent the same product pair.

### Repeated result searches

The original function used `any()` to search the results list for reverse duplicates.

This added more processing as the results list grew.

---

## 4. Optimizations Implemented

I changed the inner loop from:

```python
for j in range(len(products)):
```

to:

```python
for j in range(i + 1, len(products)):
```

This ensures that each product pair is checked only once.

It also prevents a product from being paired with itself.

Because reverse duplicates are no longer produced, I removed the repeated `any()` duplicate check.

I also calculated the minimum and maximum accepted prices once before the loops:

```python
minimum_price = target_price - price_margin
maximum_price = target_price + price_margin
```

---

## 5. Performance Results

| Version           |              Execution time |
| ----------------- | --------------------------: |
| Original version  |  Replace with original time |
| Optimized version | Replace with optimized time |

The performance improvement was:

```text
Replace with calculated percentage
```

The optimized version produced the same product combinations while completing the work faster.

---

## 6. Reflection Questions

### How did the optimization change your understanding of the algorithm?

The exercise showed me that the structure of an algorithm has a major effect on performance. The original code repeated many comparisons that were unnecessary.

Changing the loop boundaries reduced duplicate work without changing the intended result.

### Were the improvements significant enough to justify the changes?

Yes. The optimized version was faster and simpler. It also removed the need for a separate duplicate search.

The changes make the function more suitable for use on a web page where users expect a fast response.

### What did you learn about performance bottlenecks?

I learned that nested loops can become expensive when the input list is large.

I also learned that a single line such as `any()` can become a major bottleneck when it repeatedly searches through a growing list.

### How would you approach similar issues in the future?

I would first measure the current performance and establish a baseline.

I would then inspect loops, repeated calculations, database calls, file operations, and searches through large collections.

After making changes, I would run the same test again and compare the results.

### What tools would you use?

I would use:

* `time.perf_counter()` for basic timing
* `cProfile` for function profiling
* `timeit` for repeated benchmarks
* `line_profiler` for line-by-line analysis
* `memory_profiler` for memory problems

---

## 7. Key Learning

The most important lesson from this exercise is that optimization should begin with measurement.

After measuring the original program, I identified duplicate comparisons and repeated list searches as the main problems.

The optimized version avoids unnecessary work and improves the response time.
