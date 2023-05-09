class Maybe<T = any> {
  private _value: T

  public static of<T>(value: T) {
    return new Maybe(value)
  }

  constructor(value: T) {
    this._value = value
  }

  map(fn: (...arg: any) => any): Maybe {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this._value))
  }

  isNothing() {
    return this._value === null || this._value === undefined
  }

  valueOf() {
    return this._value
  }
}

//export const result = Maybe.of('Hello World').map((v) => v.toUpperCase())
export const result = Maybe.of(null).map((v) => v.toUpperCase())

console.log(result.valueOf())
