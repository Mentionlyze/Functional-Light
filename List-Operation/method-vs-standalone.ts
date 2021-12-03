/**
 * @alias Composing Method Chains
 */
function partialThis(fn: Function, ...presetArgs: any[]) {
	return function partiallyApplied(this: unknown, ...laterArgs: any[]) {
		return fn.apply(this, [...presetArgs, ...laterArgs])
	}
}

function sum(initial: number, num: number) {
	let total = initial

	total += num

	return total
}

function double(v: number) {
	return v * 2
}

function isOdd(v: number) {
	return v % 2 === 1
}

function composeChainedMethods(...fns: Function[]) {
	return function composed(result: any) {
		return fns.reduceRight((result, fn) => {
			return fn.call(result)
		}, result)
	}
}

const chainedFn = composeChainedMethods(
	partialThis(Array.prototype.reduce, sum, 0),
	partialThis(Array.prototype.map, double),
	partialThis(Array.prototype.filter, isOdd)
)


const res = chainedFn([1, 2, 3, 4, 5])

console.log(res)

/**
 * @alias Composing Standalone Utilities
 */
function compose(...fns: Function[]) {
	return fns.reduceRight(function reducer(fn1: Function, fn2: Function) {
		return function composed(args: any) {
			return fn2(fn1(args))
		}
	})
}

function partialRight(fn: Function, ...presetArgs: any[]) {
	return function partiallyApplied(...laterArgs: any[]) {
		return fn(...laterArgs, ...presetArgs)
	}
}

function filter(arr: any[], predicateFn: (value: any, index: number) => value is any) {
	return arr.filter(predicateFn)
}

function map(arr: any[], mappedFn: (value: any, index: number) => value is any) {
	return arr.map(mappedFn)
}

function reduce(arr: any[], reducerFn: (accumulator: any, currValue: any) => accumulator is any, initialValue: any) {
	return arr.reduce(reducerFn, initialValue)
}

const composeFn = compose(
	partialRight(reduce, sum, 0),
	partialRight(map, double),
	partialRight(filter, isOdd)
)

const res2 = composeFn([1, 2, 3, 4, 5])
console.log('res2', res2)

/**
 * @alias with curry
 */
function curry(fn: Function, arity = fn.length) {
	return (function nextCurried(prevArgs: any[]) {
		return function curried(...nextArgs: any[]) {
			const args = [...prevArgs, ...nextArgs]
			if (args.length === arity) {
				return fn(...args)
			}
			return nextCurried(args)
		}
	})([])
}

const curriedFilter = curry(
	(predicateFn: (value: any, index: number) => value is any, arr: any[]) =>
		arr.filter(predicateFn)
)

const curriedMap = curry(
	(mappedFn: (value: any, index: number) => value is any, arr: any[]) =>
		arr.map(mappedFn)
)

const curriedReduce = curry(
	(reducerFn: (accumulator: any, currValue: any) => accumulator is any, initialValue: number, arr: any[]) =>
		arr.reduce(reducerFn, initialValue)
)

const composedCurriedFn = compose(
	curriedReduce(sum)(0),
	curriedMap(double),
	curriedFilter(isOdd)
)

console.log(composedCurriedFn.toString())
const res3 = composedCurriedFn([1, 2, 3, 4, 5])
console.log('res3', res3)


/**
 * @alias Adapting methods to standalones
 * @note unboundMethod(..) is called invoder(...) in Ramda
 */
function unboundMethod(methodName: string, argCount: number = 2) {
	return curry((...args: any[]) => {
		const obj = args.pop()
		return obj[methodName](...args)
	}, argCount)
}

const unboundFilter = unboundMethod('filter', 2)
const unboundMap = unboundMethod('map', 2)
const unboundReduce = unboundMethod('reduce', 3)

const composedUnboundedFn = compose(
	unboundReduce(sum)(0),
	unboundMap(double),
	unboundFilter(isOdd)
)

const res4 = composedUnboundedFn([1, 2, 3, 4, 5])
console.log('res4', res4)


