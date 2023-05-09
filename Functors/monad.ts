import { ioCompose } from './io'

class Monad<T extends Function> {
  private _value: T

  public static of(value: any) {
    return new Monad(() => value)
  }

  constructor(value: T) {
    this._value = value
  }

  map(fn: Function) {
    return Monad.of(ioCompose(fn, this._value))
  }

  valueOf() {
    return this._value()
  }

  flatMap(fn: Function) {
    return this.map(fn).valueOf()
  }
}

function readFile(path: string) {
  return Monad.of(path)
}

function Upper(str: string) {
  return Monad.of(str).map((v: any) => v.toUpperCase())
}

const result = readFile('Package').flatMap(Upper).valueOf()

console.log(result)
