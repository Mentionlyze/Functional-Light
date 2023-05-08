import { ajax, add, CURRENT_USER_ID } from './some-now-some-later'

export function curry<T extends Function>(fn: T, arity = fn.length) {
  return (function nextCurried(prevArgs: any[]) {
    return function curried(nextArgs: any) {
      const args = [...prevArgs, nextArgs]

      if (args.length >= arity) {
        return fn(...args)
      } else {
        return nextCurried(args)
      }
    }
  })([])
}

const curriedAjax = curry(ajax)

const personFetch = curriedAjax('http://some.api/person')

const getCurrentUser = personFetch({ user: CURRENT_USER_ID })

getCurrentUser(function foundUser(user: any) {
  /* ... */
})

const adder = curry(add)

const res = [1, 2, 3, 4, 5].map(adder(3))

function sum(...nums: number[]) {
  let total = 0
  for (let num of nums) {
    total += num
  }
  console.log(total)
  return total
}

sum(1, 2, 3, 4, 5)

const curriedSum = curry(sum, 5)

curriedSum(1)(2)(3)(4)(5)

function looseCurry(fn: Function, arity = fn.length) {
  return (function nextCurried(prevArgs: any[]) {
    return function curried(...nextArgs: any[]) {
      const args = [...prevArgs, ...nextArgs]

      if (args.length >= arity) {
        return fn(...args)
      } else {
        return nextCurried(args)
      }
    }
  })([])
}

const curriedSum2 = looseCurry(sum, 5)
curriedSum2(1)(2, 3)(4, 5)

function uncurry(fn: Function) {
  return function uncurried(...args: any[]) {
    let ret = fn
    for (let arg of args) {
      ret = ret(arg)
    }
    return ret
  }
}

const uncurriedSum = uncurry(curriedSum)

uncurriedSum(1, 2, 3, 4, 5)
