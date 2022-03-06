import throttle from "./throttle.js";

function fun() {
  const current = new Date();
  console.log("1");
}

const tFun = throttle(fun, 1000);
