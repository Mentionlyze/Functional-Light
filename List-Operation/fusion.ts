function removeInvalidChars(str: string) {
  return str.replace(/[^\w]*/g, '')
}

function upper(str: string) {
  return str.toUpperCase()
}

function elide(str: string) {
  return str.length > 10 ? str.substr(0, 7) + '...' : str
}

export const words = "Mr. Jones isn't responsible for this disaster!".split(/\s/)

// ["Mr.","Jones","isn't","responsible","for","this","disaster!"]

words.map(removeInvalidChars).map(upper).map(elide)

// ["Mr.","Jones","isn't","responsible","for","this","disaster!"]

elide(upper(removeInvalidChars('Mr.')))
// "MR"

elide(upper(removeInvalidChars('responsible')))
// "RESPONS..."

function compose(...fns: Function[]) {
  return fns.reduceRight((fn1: any, fn2: any) => {
    return function composed(result: any): any {
      return fn2(fn1(result))
    }
  })
}

function pipe(...fns: Function[]) {
  return fns.reduce((fn1: Function, fn2: Function) => {
    return function piped(result: any): any {
      return fn2(fn1(result))
    }
  })
}

const res = words.map(compose(elide, upper, removeInvalidChars) as (value: any) => value is any)
const res1 = words.map(pipe(removeInvalidChars, upper, elide) as (value: any) => value is any)

console.log('res', res)
console.log('res1', res1)
