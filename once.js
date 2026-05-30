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