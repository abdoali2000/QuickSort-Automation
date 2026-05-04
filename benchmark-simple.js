/**
 * Simple QuickSort vs Array.sort() Benchmark - 100,000 Elements
 *
 * This is a simplified version focused on the main requirement:
 * Compare performance on a large array of 100,000 random integers
 */

const quickSort = require("./quicksort");

console.log("\n" + "═".repeat(80));
console.log("🏁 QUICKSORT vs ARRAY.SORT() - 100,000 ELEMENT BENCHMARK");
console.log("═".repeat(80) + "\n");

// Step 1: Generate a large array of 100,000 random integers
console.log("📝 Generating array with 100,000 random integers...");
const arraySize = 100000;
const largeArray = Array.from(
  { length: arraySize },
  () => Math.floor(Math.random() * 1000000), // Random integers 0-999,999
);
console.log(`✓ Generated ${arraySize.toLocaleString()} random integers\n`);

// Step 2: Benchmark QuickSort
console.log("⏱️  Benchmarking QuickSort...");
const quickSortArray = [...largeArray]; // Make a copy
const quickSortStart = performance.now();
const quickSortResult = quickSort(quickSortArray);
const quickSortEnd = performance.now();
const quickSortTime = quickSortEnd - quickSortStart;

// Verify QuickSort result
let quickSortValid = true;
for (let i = 0; i < quickSortResult.length - 1; i++) {
  if (quickSortResult[i] > quickSortResult[i + 1]) {
    quickSortValid = false;
    break;
  }
}

console.log(`  QuickSort took: ${quickSortTime.toFixed(2)} ms`);
console.log(`  ✓ Sorting ${quickSortValid ? "VERIFIED ✓" : "FAILED ✗"}\n`);

// Step 3: Benchmark built-in Array.sort()
console.log("⏱️  Benchmarking Array.sort()...");
const builtInArray = [...largeArray]; // Make a copy
const builtInStart = performance.now();
const builtInResult = builtInArray.sort((a, b) => a - b);
const builtInEnd = performance.now();
const builtInTime = builtInEnd - builtInStart;

// Verify built-in sort result
let builtInValid = true;
for (let i = 0; i < builtInResult.length - 1; i++) {
  if (builtInResult[i] > builtInResult[i + 1]) {
    builtInValid = false;
    break;
  }
}

console.log(`  Array.sort() took: ${builtInTime.toFixed(2)} ms`);
console.log(`  ✓ Sorting ${builtInValid ? "VERIFIED ✓" : "FAILED ✗"}\n`);

// Step 4: Performance Comparison
console.log("📊 PERFORMANCE COMPARISON");
console.log("─".repeat(80));

const ratio = quickSortTime / builtInTime;
const difference = Math.abs(quickSortTime - builtInTime);
const percentDifference = (
  (difference / Math.min(quickSortTime, builtInTime)) *
  100
).toFixed(1);

if (quickSortTime < builtInTime) {
  console.log(`  ✓ QuickSort is ${ratio.toFixed(2)}x FASTER than Array.sort()`);
  console.log(
    `    Difference: ${difference.toFixed(2)} ms (${percentDifference}% faster)`,
  );
} else if (quickSortTime > builtInTime) {
  console.log(
    `  ⚠️  QuickSort is ${ratio.toFixed(2)}x slower than Array.sort()`,
  );
  console.log(
    `    Difference: ${difference.toFixed(2)} ms (${percentDifference}% slower)`,
  );
} else {
  console.log(`  ≈ Both algorithms have similar performance`);
}

console.log("\n" + "─".repeat(80));
console.log("DETAILED BREAKDOWN:");
console.log("─".repeat(80));
console.log(`
Array Size:              ${arraySize.toLocaleString()} elements
Value Range:             0 to 999,999

QuickSort Results:
  • Execution Time:      ${quickSortTime.toFixed(2)} ms
  • Operations/Sec:      ${(arraySize / (quickSortTime / 1000)).toLocaleString("en-US", { maximumFractionDigits: 0 })} ops/sec
  • Time per Element:    ${((quickSortTime / arraySize) * 1000).toFixed(3)} μs
  • Correctness:         ${quickSortValid ? "✓ PASS" : "✗ FAIL"}

Array.sort() Results:
  • Execution Time:      ${builtInTime.toFixed(2)} ms
  • Operations/Sec:      ${(arraySize / (builtInTime / 1000)).toLocaleString("en-US", { maximumFractionDigits: 0 })} ops/sec
  • Time per Element:    ${((builtInTime / arraySize) * 1000).toFixed(3)} μs
  • Correctness:         ${builtInValid ? "✓ PASS" : "✗ FAIL"}
`);

console.log("═".repeat(80));
console.log("📈 ANALYSIS");
console.log("═".repeat(80));

console.log(`
Why Array.sort() is optimized:
  • Uses Timsort (hybrid of merge sort + insertion sort)
  • Adaptive: Detects existing order and exploits it
  • Optimized for real-world data patterns
  • Implemented in optimized machine code (not JavaScript)
  • Handles edge cases (nearly sorted, duplicates) efficiently

QuickSort Performance:
  • Strong average case: O(n log n) on random data
  • Simple implementation: Easy to understand and modify
  • In-place sorting: Minimal extra memory required
  • Educational value: Great for learning algorithm concepts

Recommendations:
  ✓ Production: Use Array.sort() - it's battle-tested
  ✓ Learning: Study QuickSort - understand the algorithm
  ✓ Research: Benchmark both - measure your own use cases
  ✓ Optimization: Consider randomized pivot for pre-sorted data
  ✓ Hybrid: Use Introsort for guaranteed O(n log n) worst case
`);

console.log("═".repeat(80) + "\n");

// Summary statistics
console.log("📊 SUMMARY STATISTICS");
console.log("─".repeat(80));
console.log(
  `Winner:    ${quickSortTime < builtInTime ? "QuickSort 🎯" : "Array.sort() 🎯"}`,
);
console.log(`Speed Up:  ${Math.max(ratio, 1 / ratio).toFixed(2)}x`);
console.log(
  `Time Saved: ${Math.abs(builtInTime - quickSortTime).toFixed(2)} ms`,
);
console.log("─".repeat(80) + "\n");
