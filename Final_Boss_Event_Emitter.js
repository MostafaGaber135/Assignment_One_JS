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
