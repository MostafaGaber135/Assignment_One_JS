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
