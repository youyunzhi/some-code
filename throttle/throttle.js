/**
 * 返回一个函数，这个函数会在一个时间区间内只执行一次
 * 如果 time + last < now，说明当前时间已经超过了上一次执行的时间，那么执行函数
 * 否则设置一个定时器，在定时器结束后执行函数
 */
export default function throttle(func, time) {
  let lastTime = +new Date();
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    const now = +Date.now();
    const remindWaitTime = time + lastTime - now;
    if (remindWaitTime <= 0) {
      func.apply(this, args);
      lastTime = now;
    } else {
      timer = setTimeout(() => {
        func.apply(this, args);
        lastTime = +Date.now();
        timer = null;
      }, remindWaitTime);
    }
  };
}
