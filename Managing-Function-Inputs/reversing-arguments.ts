import {ajax, partial, CURRENT_USER_ID} from './some-now-some-later'

function reverseArgs(fn: Function) {
	return function argsReversed(...args: any[]) {
		return fn(args.reverse())
	}
}

const cache: {[key: string]: any} = {}

const cacheResult = reverseArgs(partial(ajax, function onResult(obj: {id: string}) {
	cache[obj.id] = obj
}))

// later
cacheResult('http://some.api/person', {user: CURRENT_USER_ID})

function partialRight(fn: Function, ...presetArgs: any[]) {
	return function partiallyApplied(...laterArgs: any[]) {
		return fn(...laterArgs, ...presetArgs)
	}
}

function foo(x: any, y: any, z: any, ...rest: any[]) {
	console.log(x, y, z, rest)
}

const f = partialRight(foo, 'z: last')

f(1, 2)

f(1)

f(1, 2, 3)

f(1, 2, 3, 4)
