export function map(mapperFn: Function, arr: any[]) {
  const newList = []

  for (let [idx, v] of arr.entries()) {
    newList.push(mapperFn(v, idx, arr))
  }

  return newList
}

function compose(...fns: Function[]) {
  return fns.reverse().reduce(function reducer(fn1, fn2) {
    return function composed(...args: any) {
      return fn2(fn1(args))
    }
  })
}

function unary(fn: Function) {
  return function onlyOneArg(arg: any) {
    return fn(arg)
  }
}

/**
 * should avoid using map(...) in this way, because it's a net confusion to use a core FP operation in a decidedly un-FP way
 * @returns decidedly un-FP fn
 */
const res = map(unary(parseInt), ['1', '2', '3'])

console.log(res)

const increment = (v: number) => ++v
const decrement = (v: number) => --v
const square = (v: number) => v * v

const double = (v: number) => v * 2

const fnArr: Function[] = [increment, decrement, square]

const res2 = fnArr.map((fn: Function) => compose(fn, double)).map((fn: Function) => fn(3))

console.log(res2)

/**
 * Example: a string functor would be a string plus a utility that executes some operator function across all the
 * characters in the string, returning a new string with the processed letters. Consider the highly contrived example
 * @alias A Word: Functors
 */

function uppercaseLetter(c: string) {
  let code = c.charCodeAt(0)

  // lowercase letter?
  if (code >= 97 && code <= 122) {
    code = code - 32
  }

  return String.fromCharCode(code)
}

function stringMap(mapperFn: (value: any, index: number, arr: any[]) => unknown, str: string) {
  return [...str].map(mapperFn).join('')
}

const res3 = stringMap(uppercaseLetter, 'Hello World!')

console.log(res3)
