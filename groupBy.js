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
