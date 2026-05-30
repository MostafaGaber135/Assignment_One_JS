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
