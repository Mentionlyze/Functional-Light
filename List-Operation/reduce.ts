function reduce<T = any>(...args: [reducerFn: Function, initialValue: T, arr: T[]]) {
	const [reducerFn, initialValue, arr] = args
	let acc: any, startIndex: number

	if (args.length === 3) {
		acc = initialValue
		startIndex = 0
	} else if (arr.length > 0) {
		acc = arr[0]
		startIndex = 1
	} else {
		throw new Error('must provide at least one value.')
	}

	for (let index = startIndex; index < arr.length; index++) {
		acc = reducerFn(acc, arr[index], index, arr)
	}

	return acc
}

function pipe(...fns: Function[]) {
	console.log('fn0', fns[0].toString())
	return function piped(result: any) {
		return fns.reduce(function reducer(result, fn) {
			return fn(result)
		}, result)
	}
}

function pipeReducer(composedFn: Function, fn: Function) {
	return pipe(composedFn, fn)
}

const fn = [3, 17, 6, 4].map((v: number) => (n: number) => v * n).reduce(pipeReducer)

console.log(fn.toString())
console.log(fn(9))
console.log(fn(10))

function binary(fn: Function) {
	return function applyed(arg1: any, arg2: any) {
		return fn(arg1, arg2)
	}
}

const pipeReducer2 = binary(pipe)

const fn2 = [3, 17, 6, 4].map((v: number) => (n: number) => v * n).reduce(pipeReducer2)

console.log(fn2(9))
console.log(fn2(10))

[1, 2, 3, 4, 5].reduce((list, v) => (list.push(double(v)), list))










