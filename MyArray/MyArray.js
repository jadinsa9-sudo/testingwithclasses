// The file contains my class MyArray
// this is to simulate a static array
// without using any methods from JS
export { MyArray };

class MyArray {
  constructor(capacity = 100) {
    this.size = 0;
    this.capacity = capacity;
    this.array = new Array();
  }
  length() {
    return this.size;
  }

  push(item) {
    if (this.size >= this.capacity) {
      console.log("Array is full");
      return;
    }

    this.array[this.size++] = item;
  }
  validate() {
    if (this.size <= 0) {
      console.log("Array is empty");
      const working = false;
      return working;
    }
    const working = true;
    return working;
  }
  pop() {
    if (!this.validate()) return;
    return this.array[--this.size];
  }
  popHead() {
    if (!this.validate()) return;
    const item = this.array[0];
    for (let i = 0; i < this.size - 1; i++) {
      this.array[i] = this.array[i + 1];
    }
    this.size--;
    return item;
  }
  min() {
    if (!this.validate()) return;
    let min = this.array[0];
    for (let i = 1; i < this.size; i++) {
      if (this.array[i] < min) {
        min = this.array[i];
      }
    }
    return min;
  }
  max() {
    if (!this.validate()) return;
    let max = this.array[0];
    for (let i = 1; i < this.size; i++) {
      if (this.array[i] > max) {
        max = this.array[i];
      }
    }
    return max;
  }
  mean() {
    if (!this.validate()) return;
    return this.sum() / this.size;
  }
  sum() {
    if (!this.validate()) return;
    let sum = 0;
    for (let i = 0; i < this.size; i++) {
      sum += this.array[i];
    }
    return sum;
  }
  clear() {
    this.size = 0;
  }
  at(index) {
    if (index < 0 || index >= this.size) {
      console.log("Index out of bounds");
      return;
    }
    return this.array[index];
  }
  fill(item) {
    if (this.capacity === 0) {
      console.log("Array is empty");
      return;
    }
    const remainingCapacity = this.capacity - this.size;
    for (let i = 0; i < remainingCapacity; i++) {
      this.array[i] = item;
      this.size++;
    }
  }
  fastRandom(min, max) {
    if (!this.validate()) return;
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      console.log("min and max must be numbers");
      return;
    }
    for (let i = 0; i < this.size; i++) {
      this.array[i] = Math.floor(Math.random() * (max - min + 1)) + min;
      if (this.size < this.capacity) {
        this.size++;
      };
    }
  }
  // Made a bubblesort function
  Sort() {
    for (let i = 0; i < this.size - 1; i++) {
      for (let j = 0; j < this.size - 1 - i; j++) {
        if (this.array[j] > this.array[j + 1]) {
          const temp = this.array[j];
          this.array[j] = this.array[j + 1];
          this.array[j + 1] = temp;
        }
      }
    }
  }
  // This should create its own array with the items between from and to
  between(from, to) {
    if (from < 0 || to >= this.size) {
      console.log("Index out of bounds");
      return;
    }
    const newSize = to - from + 1;
    for (let i = 0; i < newSize; i++) {
      this.array[i] = this.array[from + i];
    }
    this.size = newSize;
  }
  cut(from, to) {
    if (from < 0 || to >= this.size) {
      console.log("Index out of bounds");
      return;
    }
    const newSize = to - from + 1;
    for (let i = from; i < this.size - newSize; i++) {
      this.array[i] = this.array[to + i - 1];
    }
    this.size -= newSize;
  }
  // reverse will invert every value in the array
  reverse() {
    for (let i = 0; i < this.size / 2; i++) {
      const temp = this.array[i];
      this.array[i] = this.array[this.size - 1 - i];
      this.array[this.size - 1 - i] = temp;
    }
  }
  // Bottom-up merge sort: merges sorted runs of width 1, 2, 4, ... until
  // one run covers the whole array. Stable, O(n log n).
  mergeSort() {
    const merged = [];
    for (let width = 1; width < this.size; width *= 2) {
      for (let left = 0; left < this.size; left += 2 * width) {
        const mid = left + width < this.size ? left + width : this.size;
        const right = mid + width < this.size ? mid + width : this.size;
        let i = left;
        let j = mid;
        for (let k = left; k < right; k++) {
          // Take from the left run while it has items and its head is not
          // larger than the right run's head (<= keeps equal items in order)
          if (i < mid && (j >= right || this.array[i] <= this.array[j])) {
            merged[k] = this.array[i++];
          } else {
            merged[k] = this.array[j++];
          }
        }
      }
      for (let k = 0; k < this.size; k++) {
        this.array[k] = merged[k];
      }
    }
  }
  // Insertion sort: grows a sorted section at the front, shifting larger
  // items one step right to open a slot for each new item. Stable, O(n^2).
  insertionSort() {
    for (let i = 1; i < this.size; i++) {
      const item = this.array[i];
      let slot = i;
      while (slot > 0 && this.array[slot - 1] > item) {
        this.array[slot] = this.array[slot - 1];
        slot--;
      }
      this.array[slot] = item;
    }
  }
  // Fills the whole array with random values and times each sorting
  // algorithm on an identical copy of that data. Prints the result as a
  // table and returns it, one row per algorithm.
  performance() {
    if (this.capacity <= 0) {
      console.log("Array has no capacity");
      return;
    }
    this.size = this.capacity;
    this.fastRandom(0, this.capacity);

    const unsorted = [];
    for (let i = 0; i < this.size; i++) {
      unsorted[i] = this.array[i];
    }

    const algorithms = [
      { name: "Bubble sort", sort: () => this.Sort() },
      { name: "Merge sort", sort: () => this.mergeSort() },
      { name: "Insertion sort", sort: () => this.insertionSort() },
    ];
    const results = [];
    for (let a = 0; a < algorithms.length; a++) {
      for (let i = 0; i < this.size; i++) {
        this.array[i] = unsorted[i];
      }
      const start = performance.now();
      algorithms[a].sort();
      const elapsed = performance.now() - start;
      results[a] = {
        algorithm: algorithms[a].name,
        elements: this.size,
        milliseconds: Math.round(elapsed * 1000) / 1000,
      };
    }

    console.table(results);
    return results;
  }
}
