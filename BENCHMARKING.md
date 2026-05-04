# QuickSort Benchmarking Suite

This directory contains comprehensive performance benchmarking scripts that compare the custom QuickSort implementation against JavaScript's built-in `Array.prototype.sort()` method.

## 📊 Benchmarking Scripts

### 1. **Comprehensive Benchmark** (`benchmark.js`)
Full-featured benchmark with multiple test scenarios and array sizes.

**Features:**
- Tests arrays of 10,000 and 100,000 elements
- 4 different data patterns:
  - Random data (average case)
  - Already sorted (best case for built-in, worst for QuickSort)
  - Reverse sorted (worst case)
  - Many duplicates
- Detailed performance analysis
- High-precision timing with `performance.now()`
- Visual formatting and comparisons

**Usage:**
```bash
npm run benchmark
# or
node benchmark.js
```

**Sample Output:**
```
📊 Benchmark with Array Size: 100,000 elements

📈 Test 1: Random Data (Average Case)
  QuickSort:    10.79 ms ✓
  Array.sort(): 37.23 ms ✓
  Performance:  QuickSort is 3.45x faster than Array.sort()
```

### 2. **Simple Benchmark** (`benchmark-simple.js`)
Focused benchmark for 100,000 random integers (main requirement).

**Features:**
- Single, clear focus on 100,000 elements
- Measures QuickSort vs Array.sort()
- Detailed performance metrics:
  - Execution time in milliseconds
  - Operations per second
  - Time per element in microseconds
  - Performance ratio and winner
- Correctness verification
- Actionable analysis and recommendations

**Usage:**
```bash
npm run benchmark:simple
# or
node benchmark-simple.js
```

**Sample Output:**
```
QuickSort took: 27.58 ms ✓ Sorting VERIFIED
Array.sort() took: 31.60 ms ✓ Sorting VERIFIED

✓ QuickSort is 1.15x FASTER than Array.sort()
  Difference: 4.02 ms (14.6% faster)

QuickSort Results:
  • Execution Time:      27.58 ms
  • Operations/Sec:      3,625,658 ops/sec
  • Time per Element:    0.276 μs
```

### 3. **Run All Benchmarks** (`benchmark:all`)
Convenience script that runs both benchmarks sequentially.

**Usage:**
```bash
npm run benchmark:all
```

## 📈 Key Features

### High-Precision Timing
Both scripts use `performance.now()` for microsecond-level precision:
```javascript
const startTime = performance.now();
quickSort(array);
const endTime = performance.now();
const executionTime = endTime - startTime;
```

### Multiple Test Scenarios
Different data patterns to test various algorithm behaviors:
- **Random Data**: Average case O(n log n)
- **Sorted Data**: Best case for Timsort, worst for QuickSort with last-pivot
- **Reverse Sorted**: Worst case for simple QuickSort
- **Duplicates**: Tests partition quality with repeated values

### Performance Metrics
- Execution time (ms)
- Operations per second
- Time per element (microseconds)
- Performance ratio (faster/slower)
- Verification of correctness

### Readable Output
Color-coded results with emojis:
- ✓ Green check for success
- ✗ Red X for failures
- ⚠️ Warning for edge cases
- 🏆 Winner indicator

## 🔍 Benchmark Results

### Typical Results (100,000 Elements)

**Random Data (Average Case):**
```
QuickSort:    ~10-30 ms
Array.sort(): ~30-40 ms
Winner:       QuickSort (competitive to slightly faster)
```

**Already Sorted (Best Case):**
```
QuickSort:    ✗ Stack Overflow (worst case O(n²))
Array.sort(): ~0-2 ms (adaptive Timsort wins dramatically)
Winner:       Array.sort()
```

**Duplicates Heavy (100 unique values):**
```
QuickSort:    ~60-70 ms
Array.sort(): ~20-30 ms
Winner:       Array.sort()
```

## 💡 Performance Analysis

### Why Array.sort() is Faster
1. **Timsort Algorithm**: Hybrid of merge sort + insertion sort
2. **Adaptive**: Detects and exploits existing order
3. **Optimized Implementation**: Written in C/machine code, not JavaScript
4. **Extensive Tuning**: Years of optimization for real-world data
5. **Better Worst Case**: Guaranteed O(n log n) in all cases

### Why QuickSort is Competitive
1. **Average Case**: Strong O(n log n) performance on random data
2. **In-Place**: Minimal extra memory requirements (O(log n) recursion)
3. **Low Overhead**: Simple partitioning logic
4. **Educational**: Great for learning algorithm design

### Key Findings
- ✓ QuickSort competitive on average case (random data)
- ✓ Array.sort() superior due to Timsort's adaptivity
- ⚠️ QuickSort hits worst case on sorted data (last-pivot strategy)
- 📊 Array.sort() typically 1.5-3x faster overall

## 🚀 Recommendations

### When to Use Each

**Array.sort() - Production Code ✓**
- Always use for real applications
- Battle-tested and optimized
- Handles edge cases automatically
- Adaptive performance

**QuickSort - Educational Purposes ✓**
- Learn sorting algorithm concepts
- Understand divide-and-conquer
- Explore performance optimization
- Base for more advanced sorts

**Enhanced QuickSort**
- Add randomized pivot selection (O(n log n) expected)
- Implement median-of-three pivot strategy
- Switch to insertion sort for small arrays
- Consider Introsort (hybrid approach)

## 📝 Testing All Components

```bash
# Run all tests
npm test                 # Unit tests with Jest

# Run benchmarks
npm run benchmark        # Comprehensive benchmark
npm run benchmark:simple # Quick 100K benchmark
npm run benchmark:all    # Both benchmarks

# Coverage report
npm test:coverage
```

## 🔧 Customizing Benchmarks

### Modify Array Size
Edit `benchmark.js` line ~150:
```javascript
const sizes = [10000, 100000, 1000000];  // Add 1M size
```

### Test Different Data Distributions
```javascript
// In benchmark.js, add custom generators:
function generateBiasedArray(size) {
  return Array.from({ length: size }, (_, i) => {
    if (Math.random() < 0.8) return i;  // 80% sorted
    return Math.floor(Math.random() * size);
  });
}
```

### Increase Precision
```javascript
// Run multiple iterations and average
function benchmarkMultiple(fn, arr, iterations = 3) {
  let totalTime = 0;
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn([...arr]);
    totalTime += performance.now() - start;
  }
  return totalTime / iterations;
}
```

## 📊 Expected Benchmarking Output

The scripts output:
1. **Setup Phase**: Generates test array
2. **Execution Phase**: Runs both algorithms with timing
3. **Verification Phase**: Confirms correct sorting
4. **Analysis Phase**: Compares performance
5. **Summary Phase**: Key findings and recommendations

## ⚠️ Notes on Worst-Case Behavior

The current QuickSort implementation uses a last-element pivot strategy:
- ✓ Simple to implement and understand
- ✓ Good average-case performance
- ✗ Stack overflow on pre-sorted data (10K+ elements)
- ✗ O(n²) worst case with adversarial data

**To Fix This:**
- Use randomized pivot: `arr[Math.floor(Math.random() * (high - low + 1)) + low]`
- Use median-of-three: Find middle value of first, middle, last elements
- Implement tail recursion optimization
- Switch to Introsort at depth limit

## 🎯 Learning Outcomes

Running these benchmarks teaches:
1. **Algorithm Performance**: How theory translates to practice
2. **Measurement Techniques**: Using `performance.now()` correctly
3. **System Optimization**: Why built-in functions are fast
4. **Tradeoffs**: Memory vs speed, simplicity vs efficiency
5. **Real-World Patterns**: How data distribution affects performance

## 📚 References

- **Timsort**: https://en.wikipedia.org/wiki/Timsort
- **QuickSort**: https://en.wikipedia.org/wiki/Quicksort
- **Introsort**: https://en.wikipedia.org/wiki/Introsort
- **performance.now()**: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

---

**Happy Benchmarking! 🚀**
