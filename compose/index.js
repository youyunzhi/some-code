import compose from "./compose.js";

const f1 = (a) => a + 2;
const f2 = (a) => a * 3;
const f3 = (a) => {
  console.log(`a = ${a}`);
  return a;
};

const com = compose(f1, f2, f3);
console.log("com", com(4));
