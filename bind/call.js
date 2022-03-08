// 实现call函数
Function.prototype.call = function (thisArg, ...args) {
  if (typeof this !== "function") {
    // 如果调用是非函数类型，则抛出错误
    throw new TypeError("fun is not a function");
  }
  if (thisArg === null || typeof thisArg === "undefined") {
    thisArg = window;
  } else {
    thisArg = Object(thisArg);
  }

  // 将func属性放入thisArg，这样当调用这个属性时，绑定的就是thisArg
  const func = Symbol("func");
  thisArg[func] = this;

  let result;

  if (args && typeof args === "object" && args.length) {
    result = thisArg[func](...args);
  } else if (args === undefined || args === null) {
    result = thisArg[func]();
  } else {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  delete thisArg[func];
  return result;
};
