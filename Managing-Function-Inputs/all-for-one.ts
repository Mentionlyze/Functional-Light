function unary<T extends Function, K = any>(fn: T): (arg: K) => T {
	return function onlyOneArg(arg: K) {
		return fn(arg)
	}
}

/**
 * @Many FPers tend to prefer the shorter => arrow function syntax for such code, such as:
 */
// const unary = fn => arg => fn(arg)

console.log(['1', '2', '3'].map(unary(parseInt)))
