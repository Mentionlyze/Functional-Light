export function foo(x: number, y: number) {
  console.log(x + y)
}

function bar(fn: Function) {
  fn(3, 9)
}

function spreadArgs<T extends Function, K extends Array<any> = any[]>(fn: T): (...args: K) => T {
  return function spreadFn(...argsArr: K) {
    return fn(...argsArr)
  }
}

bar(spreadArgs<(...args: number[]) => void>(foo))

function combineFirstTwo([v1, v2]: number[]) {
  return v1 + v2
}

// type GatheredFn<T, K> = (args: K) => T | ((accumulator: number, currentValue: number) => T)

function gatherArgs<T extends Function>(fn: T) {
  return function gatheredFn(...argsArr: [accumulator: number, currentValue: number]): T {
    return fn(argsArr)
  }
}

const result = [1, 2, 3, 4, 5].reduce(gatherArgs(combineFirstTwo) as (accumulator: number, currentValue: number) => any)

console.log(result)
