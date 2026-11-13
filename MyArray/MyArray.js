// The file contains my class MyArray
// this is to simulate a static array
// without using any methods from JS

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
}


// Interpret as console inputs, essentially faffing around
let myArray = new MyArray(10);
console.log(myArray.capacity);
console.log(myArray.length());

for (let i = 0; i < 23; i++) {
  myArray.push(i);
}
console.log(myArray.length());

myArray.clear();
console.log("testing clear", myArray.length());

myArray.push(1);
myArray.push(2);
myArray.push(3);
myArray.push(1);
console.log("testing popHead", myArray.popHead());
console.log("testing min", myArray.min());
console.log("testing max", myArray.max());
console.log("testing mean", myArray.mean());
console.log("testing at", myArray.at(2));
myArray.fill(10);
console.log("testing size", myArray.size);
console.log("testing fill", myArray.at(4));
// Below is supposed to fail
myArray.fastRandom('d', 'blargh');
console.log("testing fastRandom fail", myArray.at(5));
myArray.fastRandom(1, 10);

console.log("testing between", myArray);

myArray.cut(2, 4);
console.log("testing cutting", myArray);

myArray.fastRandom(1, 9);
console.log("testing fastRandom", myArray);

myArray.between(2, 4);
console.log("testing between", myArray);

myArray.reverse();
console.log("testing reverse", myArray);

myArray.Sort();
console.log("testing bubbleSort", myArray);
