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
