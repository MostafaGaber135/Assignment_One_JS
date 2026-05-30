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
