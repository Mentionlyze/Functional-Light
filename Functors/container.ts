class Container<T = any> {
  private _value: T

  public static of<T>(value: T) {
    return new Container<T>(value)
  }

  constructor(value: T) {
    this._value = value
  }

  map(fn: (arg: T) => T) {
    return new Container(fn(this._value))
  }

  valueOf() {
    return this._value
  }
}

const result = Container.of<number>(5)
  .map((x: number) => x + 1)
  .map((x: number) => x * x)

console.log(result.valueOf())
