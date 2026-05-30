// 1-This

// This in Regular Function ===> It is determined by the method of invoking the function.
// Example:
// const user = {
//   name: "Ahmed",
//   greet: function () {
//     console.log(this.name); // this = user
//   },
// };
// user.greet(); // "Ahmed"
// Move the function outside
// const fn = user.greet;
// fn(); // undefined  → this is now window, not user
// Because user.greet() → caller is user → this = user
// But fn() → no caller → this = window

// This In Arrow Function ===> It is determined by where the function is written.
// Example:
// const user = {
//   name: "Ahmed",
//   greet: () => {
//     console.log(this.name); // this = window, not user
//   },
// };
// user.greet(); // undefined 
// Because The arrow function was written inside an object literal, but the object literal has no scope of its own — so this goes up to the surrounding scope which is window
// ---------------------------------------------------------------------------------------------------------- //

// 2-Hoisting

// JavaScript has 2 phases:
// Creation Phase
// Execution Phase

// var
// Example:

console.log(x); // Undefind

var x = 5;

// Because

var x = undefined;

console.log(x);

x = 5;

// Function Declaration

// Example:
sayHi();

function sayHi() {
  console.log("Hi");
}
// Works because the whole function is hoisted.

// Function Expression
// Example:
test(); // TypeError

var test = function () {};

// Because
var test = undefined;

undefined();

// let / const

// Example:
console.log(age); // ReferenceError

let age = 20;

// Because TDZ (Temporal Dead Zone)

// ---------------------------------------------------------------------------------------------------------- //

// 3-Closures in Loops

// Closure = Function + Remembered Variables

// Example:

// With Var
for (var i = 0; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

//   4
//   4
//   4
//   4

// Because var is function-scoped and all callbacks reference same variable

// With Let
// Example:
for (let i = 0; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

// 0
// 1
// 2
// 3

// Because let creates a new binding per iteration.

// ---------------------------------------------------------------------------------------------------------- //

// 4-bind / call / apply

// call()
// Executes immediately.

// Example:
greet.call(user);
fn.call(thisArg, arg1, arg2);

// apply()
// Same as call, but arguments are passed as array.

// Example:
sum.apply(user, [5, 10]);

// bind()
// Does NOT execute immediately.
// Returns a new function with fixed this.

// Example:
const fn = greet.bind(user);

fn();
