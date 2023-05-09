export function ioCompose(...fns: Function[]) {
  return (function composed() {
    return [...fns].reverse().reduce(function reducer(result, fn) {
      return fn(result())
    })
  })()
}

class IO<T extends Function> {
  private _value: T

  public static of(value: any) {
    return new IO(() => value)
  }

  constructor(value: T) {
    this._value = value
  }

  map(fn: Function) {
    return IO.of(ioCompose(fn, this._value))
  }

  valueOf() {
    return this._value()
  }
}

export const result = IO.of({ name: 'yo' }).map((v: any) => v.name)

console.log(result.valueOf())
