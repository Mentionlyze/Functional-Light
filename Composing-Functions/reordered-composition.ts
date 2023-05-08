function pipe<T extends Function, K = any>(...fns: T[]) {
  return function piped(result: K | K[]) {
    return [...fns].reduce(function reducer(result, fn) {
      return fn(result)
    }, result)
  }
}

function reverseArgs(fn: Function) {
  return function argsReversed(...args: any[]) {
    return fn(...args.reverse())
  }
}

export function compose(...fns: Function[]) {
  return function composed(result: any[]) {
    return [...fns].reverse().reduce(function reducer(result, fn) {
      return fn(result)
    }, result)
  }
}

// const pipe = reverseArgs(compose))
