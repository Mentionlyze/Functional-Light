class Left<T = any> {
  private _value: T

  public static of<T>(value: T) {
    return new Left(value)
  }

  constructor(value: T) {
    this._value = value
  }

  map(fn: (...args: any) => any): Left {
    return this
  }

  valueOf() {
    return this._value
  }
}

class Right<T = any> {
  private _value: T

  public static of<T>(value: T) {
    return new Right(value)
  }

  constructor(value: T) {
    this._value = value
  }

  map(fn: (...args: any) => any): Right {
    return Right.of(fn(this._value))
  }

  valueOf() {
    return this._value
  }
}

function parseJson(str: string) {
  try {
    return Right.of(JSON.parse(str))
  } catch (e: any) {
    return Left.of({ error: e.message })
  }
}

export const result = parseJson('{ "name": "zs" }').map((v: any) => v.name.toUpperCase())

console.log(result.valueOf())
