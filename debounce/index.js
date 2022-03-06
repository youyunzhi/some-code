import debounce from './debounce'
const func = () => {
  console.log(1)
}
const dFunc = debounce(func, 400)