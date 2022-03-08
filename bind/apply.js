// 实现apply函数
Function.prototype.apply = function (thisArg, args) {
  if (typeof this !== "function") {
    throw new TypeError("func is not a function");
  }

  if (typeof thisArg === "undefined" || thisArg === null) {
    thisArg = window;
  } else {
    thisArg = Object(thisArg);
  }

  const func = Symbol("func");
  thisArg[func] = this;

  let result;
  if (args && typeof args === "object" && args.length) {
    result = thisArg[func](Array.from(args));
  } else if (typeof args === "undefined" || args === null) {
    result = thisArg[func]();
  } else {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  delete thisArg[func];
  return result;
};
