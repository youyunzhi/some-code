// 状态常量
const PENDING = "pending";
const FUFILLED = "fullfilled";
const REJECTED = "rejected";

class MyPromise {
  // 构造器
  constructor(executor) {
    // 初始化状态
    this.status = PENDING;
    // 初始化值
    this.value = undefined;
    // 初始化回调函数
    this.resolveCallback = [];
    this.rejectCallback = [];
    // 执行executor
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  // 状态
  state = PENDING;
  // 成功值
  value = null;
  // 失败原因
  reason = null;
  // 回调函数
  resolveCallback = [];
  rejectCallback = [];

  // 静态函数
  static resolve = (param) => {
    if (param instanceof MyPromise) {
      return param;
    } else {
      return new MyPromise((resolve) => {
        resolve(param);
      });
    }
  };

  static reject = (reason) => {
    return new MyPromise((resolve, rejected) => {
      rejected(reason);
    });
  };

  // 成功后调用方法
  resolve = (value) => {
    // 只有在状态为pending时，才执行
    if (this.state === PENDING) {
      // 设置状态为fullfilled
      this.state = FUFILLED;
      // 设置值
      this.value = value;
      // 调用回调函数
      this.resolveCallback.forEach((cb) => cb(value));
    }
  };

  // 失败后调用方法
  reject = (reason) => {
    // 只有在状态为pending时，才执行
    if (this.state === PENDING) {
      // 设置状态为rejected
      this.state = REJECTED;
      // 设置原因
      this.reason = reason;
      // 调用回调函数
      this.rejectCallback.forEach((cb) => cb(reason));
    }
  };

  resolvePromise = (promise, x, resolve, reject) => {
    // 如果返回的是自身，则抛出错误
    if (promise2 === x) {
      return reject(
        new TypeError("Chaining cycle detected for promise #<Promise>")
      );
    }

    if (x instanceof MyPromise) {
      x.then(resolve, reject);
    } else {
      resolve(x);
    }
  };

  then = (onFulfilled, onRejected) => {
    const realOnFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    const realOnRejected =
      typeof onRejected === "function"
        ? onRejected
        : (v) => {
            throw v;
          };

    // 创建新的promise
    const promise2 = new MyPromise((resolve, reject) => {
      const fullfilledMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = realOnFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      // 判断状态
      if (this.state === FUFILLED) {
        // 成功
        fullfilledMicrotask();
      } else if (this.state === REJECTED) {
        rejectedMicrotask();
      } else {
        this.resolveCallback.push(fullfilledMicrotask);
        this.rejectCallback.push(rejectedMicrotask);
      }
    });
  };

  /**
   * catch相当于一个失败逻辑处理
   */
  catch = (onRejected) => {
    return this.then(undefined, onRejected);
  };

  /**
   * all
   * 接受可迭代的promise对象，返回一个新的promise对象
   * 当迭代器中的promise状态全部为fullfilled时，返回一个成功的promise，并返回成果结果的数组
   * 否则，返回第一个失败的promise，并返回失败原因
   */
  static all = (list) => {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      let result = [];
      const check = () => {
        if (count === list.length) {
          resolve(result);
        }
      };
      list.forEach((item, index) => {
        this.resolve(item)
          .then((value) => {
            result[index] = value;
            count++;
            check();
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    });
  };

  /**
   * finally
   * 返回一个promise,fullfilled 和 rejected的状态都会继续传递
   */
  finally = (callback) => {
    return this.then(
      (value) => {
        callback(value);
        return value;
      },
      (reason) => {
        callback(reason);
        return reason;
      }
    );
  };

  /**
   * race
   * 返回一个promise，一旦迭代器中的某个promise完成or拒绝，就返回相应的结果
   */
  static race = (list) => {
    return new MyPromise((resolve, reject) => {
      list.forEach((item) => {
        this.resolve(item)
          .then((value) => {
            resolve(value);
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    });
  };
}

export default MyPromise;
