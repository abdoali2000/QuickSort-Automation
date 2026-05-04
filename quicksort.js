/**
 * QuickSort Implementation
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) for recursion stack
 */

/**
 * Partitions the array around a pivot element
 * Elements smaller than pivot go to the left, larger go to the right
 *
 * @param {number[]} arr - The array to partition
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number} The final position of the pivot
 */
function partition(arr, low, high) {
  // Choose the last element as the pivot
  const pivot = arr[high];

  // i tracks the position where smaller elements end
  let i = low - 1;

  // Compare each element with the pivot
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      // Move to next position for smaller elements
      i++;
      // Swap arr[i] and arr[j] to place smaller element on the left
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Place pivot in its correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  // Return the pivot's final position
  return i + 1;
}

/**
 * Main QuickSort function - sorts array in-place using divide-and-conquer
 *
 * @param {number[]} arr - The array to sort
 * @param {number} low - Starting index (default: 0)
 * @param {number} high - Ending index (default: arr.length - 1)
 * @returns {number[]} The sorted array
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
  // Base case: if array has 0 or 1 element, it's already sorted
  if (low < high) {
    // Partition the array and get the pivot position
    const pivotIndex = partition(arr, low, high);

    // Recursively sort the left sub-array (elements smaller than pivot)
    quickSort(arr, low, pivotIndex - 1);

    // Recursively sort the right sub-array (elements larger than pivot)
    quickSort(arr, pivotIndex + 1, high);
  }

  return arr;
}

// Export for use in other files
module.exports = quickSort;
