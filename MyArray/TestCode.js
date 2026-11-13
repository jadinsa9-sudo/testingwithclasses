import { MyArray } from "./MyArray.js";

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

console.log("testing random", myArray);

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

// mergeSort tests
function arrayOf(items) {
  const result = new MyArray();
  for (const item of items) {
    result.push(item);
  }
  return result;
}

function checkMergeSort(name, sorted, expected) {
  let passed = sorted.length() === expected.length;
  for (let i = 0; passed && i < expected.length; i++) {
    passed = sorted.at(i) === expected[i];
  }
  console.log("testing mergeSort", name, passed ? "PASS" : "FAIL");
}

function testMergeSort(name, items, expected) {
  const sorted = arrayOf(items);
  sorted.mergeSort();
  checkMergeSort(name, sorted, expected);
}

testMergeSort("empty", [], []);
testMergeSort("single item", [7], [7]);
testMergeSort("already sorted", [1, 2, 3, 4], [1, 2, 3, 4]);
testMergeSort("reversed", [5, 4, 3, 2, 1], [1, 2, 3, 4, 5]);
testMergeSort("duplicates", [3, 1, 3, 2, 1, 3], [1, 1, 2, 3, 3, 3]);
testMergeSort("negatives", [0, -5, 12, -1, 3], [-5, -1, 0, 3, 12]);
testMergeSort("odd length", [9, 2, 7, 4, 8, 1, 6], [1, 2, 4, 6, 7, 8, 9]);

// Popped items linger in the backing array and must not be sorted back in
const popped = arrayOf([5, 3, 9, 1]);
popped.pop();
popped.mergeSort();
checkMergeSort("ignores popped items", popped, [3, 5, 9]);

// Should agree with the bubble sort on random data
const randomMerge = new MyArray(50);
randomMerge.fill(0);
randomMerge.fastRandom(1, 100);
const randomBubble = arrayOf(randomMerge.array);
randomMerge.mergeSort();
randomBubble.Sort();
checkMergeSort("matches bubbleSort", randomMerge, randomBubble.array);

// insertionSort tests
function checkInsertionSort(name, unsorted, expected) {
  unsorted.insertionSort();
  let passed = unsorted.length() === expected.length;
  for (let i = 0; passed && i < expected.length; i++) {
    passed = unsorted.at(i) === expected[i];
  }
  console.log("testing insertionSort", name, passed ? "PASS" : "FAIL");
}

checkInsertionSort("empty", arrayOf([]), []);
checkInsertionSort("single item", arrayOf([7]), [7]);
checkInsertionSort("already sorted", arrayOf([1, 2, 3, 4]), [1, 2, 3, 4]);
checkInsertionSort("reversed", arrayOf([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5]);
checkInsertionSort("duplicates", arrayOf([3, 1, 3, 2, 1, 3]), [1, 1, 2, 3, 3, 3]);
checkInsertionSort("negatives", arrayOf([0, -5, 12, -1, 3]), [-5, -1, 0, 3, 12]);
checkInsertionSort("smallest item last", arrayOf([2, 3, 4, 5, 1]), [1, 2, 3, 4, 5]);

// Popped items linger in the backing array and must not be sorted back in
const poppedInsertion = arrayOf([5, 3, 9, 1]);
poppedInsertion.pop();
checkInsertionSort("ignores popped items", poppedInsertion, [3, 5, 9]);

// Should agree with the bubble sort on random data
const randomInsertion = new MyArray(50);
randomInsertion.fill(0);
randomInsertion.fastRandom(1, 100);
const randomBubbleCopy = arrayOf(randomInsertion.array);
randomBubbleCopy.Sort();
checkInsertionSort("matches bubbleSort", randomInsertion, randomBubbleCopy.array);
