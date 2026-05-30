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
