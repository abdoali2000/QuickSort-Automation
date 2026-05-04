/**
 * Performance Benchmark: QuickSort vs Built-in Array.sort()
 *
 * This script compares the performance of the custom QuickSort implementation
 * against JavaScript's native Array.prototype.sort() method.
 *
 * It generates large arrays and measures execution time using performance.now()
 * for high-precision timing.
 */

const quickSort = require("./quicksort");

/**
 * Generate an array of random integers
 * @param {number} size - Number of elements to generate
 * @param {number} max - Maximum value (default: 1000000)
 * @returns {number[]} Array of random integers
 */
function generateRandomArray(size, max = 1000000) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

/**
 * Generate an already sorted array (best case for some algorithms)
 * @param {number} size - Number of elements
 * @returns {number[]} Sorted array
 */
function generateSortedArray(size) {
  return Array.from({ length: size }, (_, i) => i);
}

/**
 * Generate a reverse sorted array (worst case for QuickSort with last pivot)
 * @param {number} size - Number of elements
 * @returns {number[]} Reverse sorted array
 */
function generateReverseSortedArray(size) {
  return Array.from({ length: size }, (_, i) => size - i);
}

/**
 * Benchmark a sorting function
 * @param {Function} sortFn - Sorting function to benchmark
 * @param {number[]} arr - Array to sort
 * @param {string} name - Name of the algorithm
 * @returns {Object} Benchmark result with time and verification
 */
function benchmarkSort(sortFn, arr, name) {
  // Create a copy to avoid modifying original
  const arrayToSort = [...arr];

  // Start timing
  const startTime = performance.now();

  // Execute sort
  let result;
  try {
    result = sortFn(arrayToSort);
  } catch (error) {
    return {
      name,
      time: null,
      error: error.message,
      success: false,
    };
  }

  // End timing
  const endTime = performance.now();
  const executionTime = endTime - startTime;

  // Verify array is sorted correctly
  let isSorted = true;
  for (let i = 0; i < result.length - 1; i++) {
    if (result[i] > result[i + 1]) {
      isSorted = false;
      break;
    }
  }

  return {
    name,
    time: executionTime,
    success: isSorted,
    isSorted,
  };
}

/**
 * Format time in milliseconds with appropriate precision
 * @param {number} ms - Time in milliseconds
 * @returns {string} Formatted time string
 */
function formatTime(ms) {
  if (ms < 0.01) {
    return `${(ms * 1000).toFixed(3)} μs`; // microseconds
  } else if (ms < 1) {
    return `${ms.toFixed(3)} ms`;
  } else if (ms < 1000) {
    return `${ms.toFixed(2)} ms`;
  } else {
    return `${(ms / 1000).toFixed(2)} s`;
  }
}

/**
 * Calculate performance ratio
 * @param {number} time1 - First time in ms
 * @param {number} time2 - Second time in ms
 * @returns {string} Formatted ratio string
 */
function calculateRatio(time1, time2) {
  const ratio = time1 / time2;
  if (ratio > 1) {
    return `${ratio.toFixed(2)}x slower`;
  } else if (ratio < 1) {
    return `${(1 / ratio).toFixed(2)}x faster`;
  } else {
    return "equal";
  }
}

/**
 * Run comprehensive benchmark suite
 */
function runBenchmarks() {
  console.log("\n" + "=".repeat(80));
  console.log("⚡ QUICKSORT PERFORMANCE BENCHMARK SUITE");
  console.log("=".repeat(80) + "\n");

  const sizes = [10000, 100000];

  sizes.forEach((size) => {
    console.log(
      `\n📊 Benchmark with Array Size: ${size.toLocaleString()} elements`,
    );
    console.log("-".repeat(80));

    // ============================================
    // Test 1: Random Data (Average Case)
    // ============================================
    console.log(`\n📈 Test 1: Random Data (Average Case)`);
    const randomArray = generateRandomArray(size);

    const quickSortRandom = benchmarkSort(
      (arr) => quickSort(arr),
      randomArray,
      "QuickSort",
    );

    const builtInRandom = benchmarkSort(
      (arr) => arr.sort((a, b) => a - b),
      randomArray,
      "Array.sort()",
    );

    console.log(
      `  QuickSort:    ${formatTime(quickSortRandom.time)} ${quickSortRandom.success ? "✓" : "✗ FAILED"}`,
    );
    console.log(
      `  Array.sort(): ${formatTime(builtInRandom.time)} ${builtInRandom.success ? "✓" : "✗ FAILED"}`,
    );

    if (quickSortRandom.success && builtInRandom.success) {
      const ratio = calculateRatio(quickSortRandom.time, builtInRandom.time);
      console.log(`  Performance:  QuickSort is ${ratio} than Array.sort()`);
    }

    // ============================================
    // Test 2: Already Sorted Data (Best/Worst Case)
    // ============================================
    console.log(
      `\n📈 Test 2: Already Sorted Data (Best Case for Built-in, Worst for QuickSort)`,
    );
    const sortedArray = generateSortedArray(size);

    const quickSortSorted = benchmarkSort(
      (arr) => quickSort(arr),
      sortedArray,
      "QuickSort",
    );

    const builtInSorted = benchmarkSort(
      (arr) => arr.sort((a, b) => a - b),
      sortedArray,
      "Array.sort()",
    );

    console.log(
      `  QuickSort:    ${quickSortSorted.time !== null ? formatTime(quickSortSorted.time) : "✗ ERROR: " + quickSortSorted.error} ${quickSortSorted.success ? "✓" : "✗"}`,
    );
    console.log(
      `  Array.sort(): ${formatTime(builtInSorted.time)} ${builtInSorted.success ? "✓" : "✗ FAILED"}`,
    );

    if (quickSortSorted.success && builtInSorted.success) {
      const ratio = calculateRatio(quickSortSorted.time, builtInSorted.time);
      console.log(`  Performance:  QuickSort is ${ratio} than Array.sort()`);
    } else if (quickSortSorted.error) {
      console.log(
        `  Note: QuickSort hit worst-case O(n²) scenario (expected with last-pivot strategy)`,
      );
    }

    // ============================================
    // Test 3: Reverse Sorted Data (Worst Case)
    // ============================================
    console.log(`\n📈 Test 3: Reverse Sorted Data (Worst Case for QuickSort)`);

    // Only test with reverse sorted if size is small enough
    if (size <= 10000) {
      const reverseSortedArray = generateReverseSortedArray(size);

      const quickSortReverse = benchmarkSort(
        (arr) => quickSort(arr),
        reverseSortedArray,
        "QuickSort",
      );

      const builtInReverse = benchmarkSort(
        (arr) => arr.sort((a, b) => a - b),
        reverseSortedArray,
        "Array.sort()",
      );

      console.log(
        `  QuickSort:    ${quickSortReverse.time !== null ? formatTime(quickSortReverse.time) : "✗ ERROR: " + quickSortReverse.error} ${quickSortReverse.success ? "✓" : "✗"}`,
      );
      console.log(
        `  Array.sort(): ${formatTime(builtInReverse.time)} ${builtInReverse.success ? "✓" : "✗ FAILED"}`,
      );

      if (quickSortReverse.success && builtInReverse.success) {
        const ratio = calculateRatio(
          quickSortReverse.time,
          builtInReverse.time,
        );
        console.log(`  Performance:  QuickSort is ${ratio} than Array.sort()`);
      } else if (quickSortReverse.error) {
        console.log(
          `  Note: QuickSort hit worst-case O(n²) scenario (expected with last-pivot strategy)`,
        );
      }
    } else {
      console.log(
        `  ⚠️  Skipped for size ${size.toLocaleString()} (would cause stack overflow)`,
      );
      console.log(
        `  💡 Tip: Use randomized pivot or Timsort to handle this case`,
      );
    }

    // ============================================
    // Test 4: Array with Many Duplicates
    // ============================================
    console.log(`\n📈 Test 4: Array with Many Duplicates`);
    const duplicateArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 100), // Only 100 unique values
    );

    const quickSortDuplicate = benchmarkSort(
      (arr) => quickSort(arr),
      duplicateArray,
      "QuickSort",
    );

    const builtInDuplicate = benchmarkSort(
      (arr) => arr.sort((a, b) => a - b),
      duplicateArray,
      "Array.sort()",
    );

    console.log(
      `  QuickSort:    ${formatTime(quickSortDuplicate.time)} ${quickSortDuplicate.success ? "✓" : "✗ FAILED"}`,
    );
    console.log(
      `  Array.sort(): ${formatTime(builtInDuplicate.time)} ${builtInDuplicate.success ? "✓" : "✗ FAILED"}`,
    );

    if (quickSortDuplicate.success && builtInDuplicate.success) {
      const ratio = calculateRatio(
        quickSortDuplicate.time,
        builtInDuplicate.time,
      );
      console.log(`  Performance:  QuickSort is ${ratio} than Array.sort()`);
    }
  });

  // ============================================
  // Summary and Analysis
  // ============================================
  console.log("\n" + "=".repeat(80));
  console.log("📋 BENCHMARK SUMMARY & ANALYSIS");
  console.log("=".repeat(80));
  console.log(`
Performance Analysis:
  ✓ QuickSort (Average): Competitive with built-in sort on random data
  ✓ Array.sort(): Highly optimized (likely using Timsort)
  ⚠️  QuickSort (Worst Case): Stack overflow on pre-sorted data with last-pivot strategy
  
Key Findings:
  1. Array.sort() is typically faster due to advanced optimizations (Timsort)
  2. QuickSort competitive on average case with random data
  3. Built-in sort is adaptive (exploits existing order)
  4. QuickSort benefits from randomized pivot selection for pre-sorted data
  
Recommendations:
  • Use Array.sort() for production code (industry-standard optimization)
  • Use custom QuickSort for educational purposes or specialized cases
  • Implement randomized pivot selection for better worst-case performance
  • Consider hybrid approaches (Introsort) for guaranteed O(n log n)
  `);
  console.log("=".repeat(80) + "\n");
}

// ============================================
// Execute Benchmarks
// ============================================
if (require.main === module) {
  try {
    runBenchmarks();
  } catch (error) {
    console.error("❌ Benchmark failed:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

module.exports = {
  generateRandomArray,
  generateSortedArray,
  generateReverseSortedArray,
  benchmarkSort,
  formatTime,
  calculateRatio,
  runBenchmarks,
};
