// Tests for MyArray: the specified behaviour of every method, and how
// the class handles deviations (empty array, full array, bad arguments).
import { MyArray } from "../../MyArray/MyArray.js";

function arrayOf(items, capacity = 100) {
  const result = new MyArray(capacity);
  for (const item of items) {
    result.push(item);
  }
  return result;
}

// The live items of the array as text, e.g. "1, 2, 3"
function contents(myArray) {
  const items = [];
  for (let i = 0; i < myArray.length(); i++) {
    items.push(myArray.at(i));
  }
  return items.join(", ");
}

function isSorted(myArray) {
  for (let i = 1; i < myArray.length(); i++) {
    if (myArray.at(i - 1) > myArray.at(i)) return false;
  }
  return true;
}

export function runTests() {
  const results = [];
  const test = (name, actual, expected) => {
    results.push({ name, passed: actual === expected, actual, expected });
  };

  // push / length
  test("a new array is empty", new MyArray().length(), 0);
  test("push adds items in order", contents(arrayOf([1, 2, 3])), "1, 2, 3");
  test("push on a full array is ignored", contents(arrayOf([1, 2, 3], 2)), "1, 2");

  // pop / popHead
  const popped = arrayOf([1, 2, 3]);
  test("pop returns the last item", popped.pop(), 3);
  test("pop removes the last item", contents(popped), "1, 2");
  test("pop on an empty array returns undefined", new MyArray().pop(), undefined);

  const headPopped = arrayOf([1, 2, 3]);
  test("popHead returns the first item", headPopped.popHead(), 1);
  test("popHead shifts the remaining items", contents(headPopped), "2, 3");
  test("popHead on an empty array returns undefined", new MyArray().popHead(), undefined);

  // min / max / sum / mean
  const numbers = arrayOf([4, -2, 9, 1]);
  test("min returns the smallest item", numbers.min(), -2);
  test("max returns the largest item", numbers.max(), 9);
  test("sum adds all items", numbers.sum(), 12);
  test("mean returns the average", numbers.mean(), 3);
  test("min on an empty array returns undefined", new MyArray().min(), undefined);
  test("max on an empty array returns undefined", new MyArray().max(), undefined);
  test("mean on an empty array returns undefined", new MyArray().mean(), undefined);

  // clear / at
  const cleared = arrayOf([1, 2, 3]);
  cleared.clear();
  test("clear empties the array", cleared.length(), 0);
  test("at returns the item at an index", arrayOf([5, 6, 7]).at(1), 6);
  test("at with a negative index returns undefined", arrayOf([5, 6, 7]).at(-1), undefined);
  test("at past the last item returns undefined", arrayOf([5, 6, 7]).at(3), undefined);

  // fill
  const filled = new MyArray(4);
  filled.fill(7);
  test("fill on an empty array fills the capacity", contents(filled), "7, 7, 7, 7");
  const partlyFilled = arrayOf([1, 2], 4);
  partlyFilled.fill(7);
  test("fill on a partly filled array reaches the last slot", partlyFilled.at(3), 7);

  // fastRandom
  const random = arrayOf([0, 0, 0, 0, 0], 5);
  random.fastRandom(1, 6);
  let inRange = true;
  for (let i = 0; i < random.length(); i++) {
    inRange = inRange && random.at(i) >= 1 && random.at(i) <= 6;
  }
  test("fastRandom keeps every value within min and max", inRange, true);
  const notRandom = arrayOf([1, 2, 3]);
  notRandom.fastRandom("a", "b");
  test("fastRandom with non-numbers leaves the array alone", contents(notRandom), "1, 2, 3");

  // between / cut
  const between = arrayOf([0, 1, 2, 3, 4]);
  between.between(1, 3);
  test("between keeps only the items from..to", contents(between), "1, 2, 3");
  const betweenOutside = arrayOf([0, 1, 2]);
  betweenOutside.between(1, 5);
  test("between out of bounds leaves the array alone", contents(betweenOutside), "0, 1, 2");

  const cut = arrayOf([0, 1, 2, 3, 4]);
  cut.cut(1, 2);
  test("cut removes the items from..to", contents(cut), "0, 3, 4");
  const cutOutside = arrayOf([0, 1, 2]);
  cutOutside.cut(-1, 1);
  test("cut out of bounds leaves the array alone", contents(cutOutside), "0, 1, 2");

  // reverse
  const reversedOdd = arrayOf([1, 2, 3]);
  reversedOdd.reverse();
  test("reverse with an odd number of items", contents(reversedOdd), "3, 2, 1");
  const reversedEven = arrayOf([1, 2, 3, 4]);
  reversedEven.reverse();
  test("reverse with an even number of items", contents(reversedEven), "4, 3, 2, 1");

  // the three sorting algorithms
  for (const sort of ["Sort", "mergeSort", "insertionSort"]) {
    const sorted = arrayOf([5, 3, 9, -1, 3]);
    sorted[sort]();
    test(`${sort} sorts ascending`, contents(sorted), "-1, 3, 3, 5, 9");

    const empty = new MyArray();
    empty[sort]();
    test(`${sort} on an empty array does nothing`, empty.length(), 0);
  }

  // performance
  const timed = new MyArray(200);
  const timings = timed.performance();
  test("performance times three algorithms", timings.length, 3);
  test("performance randomises every element", timed.length(), 200);
  test("performance leaves the array sorted", isSorted(timed), true);
  test("performance without capacity returns undefined", new MyArray(0).performance(), undefined);

  return results;
}
