function output(txt: any) {
	console.log(txt)
}

function printIf(predicate: (arg: any) => boolean, msg: any) {
	if (predicate(msg)) {
		output(msg)
	}
}

function isShortEnough(str: string) {
	return str.length <= 5
}

const msg1 = 'Hello'
const msg2 = msg1 + ' World'

printIf(isShortEnough, msg1)
printIf(isShortEnough, msg2)

function isLongEnough(str: string) {
	return !isShortEnough(str)
}

printIf(isLongEnough, msg1)
printIf(isLongEnough, msg2)

function not(predicate: (...args: any[]) => boolean) {
	return function negated(...args: any[]) {
		return !predicate(...args)
	}
}

const isLongEnough2 = not(isShortEnough)

printIf(isLongEnough2, msg2)

function when(predicate: Function, fn: Function) {
	return function conditional(...args: any[]) {
		if (predicate(...args)) {
			return fn(...args)
		}
	}
}

function partialRight(fn: Function, ...presetArgs: any[]) {
	return function partiallyApplied(...laterArgs: any[]) {
		return fn(...laterArgs, ...presetArgs)
	}
}

function uncurry(fn: Function) {
	return function uncurried(...args: any[]) {
		let ret = fn
		for (let arg of args) {
			ret = ret(arg)
		}
		return ret
	}
}

const printIf2 = uncurry(partialRight(when, output))

const ret = printIf2(isLongEnough)

ret(msg2)

console.log(printIf2.toString())
console.log(ret.toString())

