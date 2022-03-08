// bind函数
Function.prototype.bind = function (thisArg, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("func is not a function");
  }

  if (typeof thisArg === "undefined" || thisArg === null) {
    thisArg = window;
  } else {
    thisArg = Object(thisArg);
  }

  const func = this;

  const bound = function (...boundArgs) {
    let isNew = false;
    // 如果this不是构造器，则直接使用会报错
    try {
      isNew = this instanceof func;
    } catch (e) {}
    return func.apply(isNew ? this : thisArg, args.concat(boundArgs));
  };

  // 实现原型链继承

  // const Empty = function () {};
  // Empty.prototype = this.prototype;
  // bound.prototype = new Empty();

  bound.prototype = Object.create(this.prototype);

  return bound;
};
