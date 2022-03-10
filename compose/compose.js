export default function compose(...func) {
  // 获取传入组合函数的函数列表，使用Array.from将类数组转成数组。
  const list = Array.from(func);
  return function (result) {
    // 遍历函数数组，注意是从后往前执行函数
    let response = null;
    while (list.length > 0) {
      const currentFunc = list.pop();
      response = currentFunc(response || result);
    }
    return response;
  };
}

// 也可以使用reduce实现