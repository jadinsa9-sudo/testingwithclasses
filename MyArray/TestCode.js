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
