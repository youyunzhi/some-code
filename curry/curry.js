/**
 *
 * @param {*} fn 待柯里化的函数
 * @param {*} len 需要的参数长度
 * @param  {...any} args 传入的参数
 * @returns 柯里化后的函数
 */
export default function _curry(fn, len, ...args) {
  return function (...params) {
    let _args = [...args, ...params];
    // 如果函数传入的参数 + 默认传入的参数不小于需要的参数，则直接执行函数，并返回执行结果
    if (_args.length >= len) {
      return fn.apply(this, _args);
    } else {
      // 否则，返回一个函数，继续等待参数
      return _curry.call(this, fn, len, ...args);
    }
  };
}
