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
