# Advanced JavaScript Utility Library

## Table of Contents

1. [customMap](#1-custommap)
2. [customFilter](#2-customfilter)
3. [customReduce](#3-customreduce)
4. [groupBy](#4-groupby)
5. [deepClone](#5-deepclone)
6. [once](#6-once)
7. [memoize](#7-memoize)
8. [compose](#8-compose)
9. [flattenArray](#9-flattenarray)
10. [createCounter](#10-createcounter)
11. [createSecretHolder](#11-createsecretHolder)
12. [pipeAsync](#12-pipeasync)
13. [Weird JavaScript](#13-weird-javascript)
14. [Event Emitter](#14-event-emitter)

---

## 1. customMap

**Problem:** Create your own implementation of map.

**Example:**

```javascript
const nums = [1, 2, 3];
const result = customMap(nums, function (x) {
  return x * 2;
});
console.log(result); // [2, 4, 6]
```

**Solution:**

```javascript
function customMap(arr, callBack) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const value = callBack(arr[i], i, arr);
    result.push(value);
  }
  return result;
}

const result = customMap([1, 2, 3], function (num) {
  return num * 2;
});
console.log(result);
```

---

## 2. customFilter

**Problem:** Create your own implementation of filter.

**Example:**

```javascript
const users = [
  { name: "Ahmed", age: 22 },
  { name: "Sara", age: 15 },
];
const result = customFilter(users, function (user) {
  return user.age > 18;
});
console.log(result); // [{ name: "Ahmed", age: 22 }]
```

**Solution:**

```javascript
function customFilter(arr, callBack) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (callBack(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

const users = [
  { name: "Ahmed", age: 22 },
  { name: "Sara", age: 15 },
];

const result = customFilter(users, function (user) {
  return user.age > 18;
});

console.log(result);
```

---

## 3. customReduce

**Problem:** Create your own implementation of reduce.

**Example:**

```javascript
const total = customReduce(
  [1, 2, 3],
  function (acc, current) {
    return acc + current;
  },
  0
);
console.log(total); // 6
```

**Solution:**

```javascript
function customReduce(arr, callBack, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < arr.length; i++) {
    accumulator = callBack(accumulator, arr[i]);
  }
  return accumulator;
}

const result = customReduce(
  [1, 2, 3],
  function (accumulator, current) {
    return accumulator + current;
  },
  0,
);
console.log(result);
```

---

## 4. groupBy

**Problem:** Group array items based on a specific property.

**Example:**

```javascript
const users = [
  { name: "Ahmed", role: "admin" },
  { name: "Sara", role: "user" },
  { name: "Ali", role: "admin" },
];
console.log(groupBy(users, "role"));
// { admin: [{...}, {...}], user: [{...}] }
```

**Solution:**

```javascript
function groupBy(arr, key) {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    const groupKey = arr[i][key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(arr[i]);
  }
  return result;
}

const users = [
  { name: "Ahmed", role: "admin" },
  { name: "Sara", role: "user" },
  { name: "Ali", role: "admin" },
];

const result = groupBy(users, "role");

console.log(result);
```

---

## 5. deepClone

**Problem:** Create a deep clone utility for objects and arrays.

**Example:**

```javascript
const original = {
  user: {
    name: "Ahmed",
    hobbies: ["football", "coding"],
  },
};
const copy = deepClone(original);
copy.user.name = "Sara";
console.log(original.user.name); // "Ahmed" (not affected)
```

**Solution:**

```javascript
function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }
  if (Array.isArray(value)) {
    const result = [];
    for (let i = 0; i < value.length; i++) {
      result.push(deepClone(value[i]));
    }
    return result;
  }
  const result = {};
  for (let key in value) {
    result[key] = deepClone(value[key]);
  }
  return result;
}

const original = {
  user: {
    name: "Ahmed",
    hobbies: ["football", "coding"],
  },
};

const copy = deepClone(original);

copy.user.name = "Sara";
copy.user.hobbies[0] = "swimming";

console.log(original);
console.log(copy);
```

---

## 6. once

**Problem:** Function can execute only once.

**Example:**

```javascript
function sayName() {
  console.log("Mostafa");
}
const init = once(sayName);
init(); // "Mostafa"
init(); // nothing happens
init(); // nothing happens
```

**Solution:**

```javascript
function once(fn) {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      return fn(...arguments);
    }
  };
}

function sayName() {
  console.log("Mostafa");
}

const init = once(sayName);
init();
init();
init();
```

---

## 7. memoize

**Problem:** Cache function results for performance optimization.

**Example:**

```javascript
const fib = memoize((n) => {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});
console.log(fib(10)); // 55
```

**Solution:**

```javascript
function memoize(fn) {
  const cache = new Map();
  return function (value) {
    if (cache.has(value)) {
      return cache.get(value);
    }
    const result = fn(value);
    cache.set(value, result);
    return result;
  };
}

const fib = memoize((n) => {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
});

console.log(fib(10));
console.log(fib(1));
console.log(fib(0));
```

---

## 8. compose

**Problem:** Compose multiple functions together (right to left).

**Example:**

```javascript
const result = compose(square, double, addOne);
console.log(result(2)); // 36
// addOne(2)=3 → double(3)=6 → square(6)=36
```

**Solution:**

```javascript
function compose(...fns) {
  return function (value) {
    let result = value;
    for (let i = fns.length - 1; i >= 0; i--) {
      result = fns[i](result);
    }
    return result;
  };
}

function addOne(x) {
  return x + 1;
}

function double(x) {
  return x * 2;
}

function square(x) {
  return x * x;
}

const result = compose(square, double, addOne);

console.log(result(2));
```

---

## 9. flattenArray

**Problem:** Flatten deeply nested arrays.

**Example:**

```javascript
console.log(flattenArray([1, [2, [3, [4]]]]));
// [1, 2, 3, 4]
```

**Solution:**

```javascript
function flattenArray(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const flat = flattenArray(arr[i]);

      for (let j = 0; j < flat.length; j++) {
        result.push(flat[j]);
      }
    } else {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(flattenArray([1, [2, [3, [4]]]]));
```

---

## 10. createCounter

**Problem:** Build counter utility using closures only.

**Example:**

```javascript
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

**Solution:**

```javascript
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
```

---

## 11. createSecretHolder

**Problem:** Protect private data using closures.

**Example:**

```javascript
const secret = createSecretHolder("123");
console.log(secret.getSecret()); // "123"
secret.setSecret("456");
console.log(secret.getSecret()); // "456"
```

**Solution:**

```javascript
function createSecretHolder(secretHolderNumber) {
  let secretValue = secretHolderNumber;
  return {
    getSecret: function () {
      return secretValue;
    },

    setSecret: function (newSecret) {
      secretValue = newSecret;
    },
  };
}

const secret = createSecretHolder("123");
console.log(secret.getSecret());

secret.setSecret("135");
console.log(secret.getSecret());
```

---

## 12. pipeAsync

**Problem:** Create async pipeline utility (left to right).

**Example:**

```javascript
const result = await pipeAsync(addOne, double, square);
console.log(await result(2)); // 36
// addOne(2)=3 → double(3)=6 → square(6)=36
```

**Solution:**

```javascript
async function pipeAsync(...fns) {
  return async function (value) {
    let result = value;
    for (let i = 0; i < fns.length; i++) {
      result = await fns[i](result);
    }
    return result;
  };
}

async function addOne(x) {
  return x + 1;
}

async function double(x) {
  return x * 2;
}

async function square(x) {
  return x * x;
}

const result = await pipeAsync(addOne, double, square);
console.log(await result(2));
```

---

## 13. Weird JavaScript

**Problem:** Explain and demonstrate weird JavaScript behaviors.

### this

```javascript
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
// Because The arrow function was written inside an object literal,
// but the object literal has no scope of its own
// so this goes up to the surrounding scope which is window
```

### Hoisting

```javascript
// JavaScript has 2 phases:
// Creation Phase
// Execution Phase

// var
console.log(x); // Undefined
var x = 5;

// Because
var x = undefined;
console.log(x);
x = 5;

// Function Declaration
sayHi();
function sayHi() {
  console.log("Hi");
}
// Works because the whole function is hoisted.

// Function Expression
test(); // TypeError
var test = function () {};
// Because
var test = undefined;
undefined();

// let / const
console.log(age); // ReferenceError
let age = 20;
// Because TDZ (Temporal Dead Zone)
```

### Closures in Loops

```javascript
// Closure = Function + Remembered Variables

// With Var
for (var i = 0; i <= 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// 4
// 4
// 4
// 4
// Because var is function-scoped and all callbacks reference same variable

// With Let
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
```

### bind / call / apply

```javascript
// call()
// Executes immediately.
greet.call(user);
fn.call(thisArg, arg1, arg2);

// apply()
// Same as call, but arguments are passed as array.
sum.apply(user, [5, 10]);

// bind()
// Does NOT execute immediately.
// Returns a new function with fixed this.
const fn = greet.bind(user);
fn();
```

---

## 14. Event Emitter

**Problem:** Build a small event emitter system.

**Example:**

```javascript
on("login", function (user) {
  console.log("Welcome " + user.name);
});
on("login", function (user) {
  console.log(user.name + " logged in successfully");
});
emit("login", { name: "Mostafa" });
// "Welcome Mostafa"
// "Mostafa logged in successfully"
```

**Solution:**

```javascript
const events = {};

function on(eventName, callback) {
  if (!events[eventName]) {
    events[eventName] = [];
  }
  events[eventName].push(callback);
}

function emit(eventName, data) {
  if (!events[eventName]) {
    return;
  }
  for (let i = 0; i < events[eventName].length; i++) {
    events[eventName][i](data);
  }
}

on("login", function (user) {
  console.log("Welcome " + user.name);
});

on("login", function (user) {
  console.log(user.name + " logged in successfully");
});

emit("login", { name: "Mostafa" });
```