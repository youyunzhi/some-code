import MyPromise from "./myPromise.js";
export default (function () {
  console.log("index.js");
  const promise = new MyPromise((resolve, reject) => {
    // resolve(1);
    reject("error");
  }).then(
    (value) => {
      console.log(value);
    },
    (reason) => {
      console.log(reason);
    }
  );
})();
