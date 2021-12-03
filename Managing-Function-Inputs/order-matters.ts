function partialProps(fn: Function, presetArgsObj: Record<string, any>) {
	return function partiallyApplied(laterArgsObj: Record<string, any>) {
		return fn(Object.assign({}, presetArgsObj, laterArgsObj))
	}
}

function curryProps(fn: Function, arity = 1) {
	return (function nextCurried(prevArgsObj: Record<string, any>) {
		return function curried(nextArgsObj: {[key: string]: any}) {
			const [key] = Object.keys(nextArgsObj)
			const allArgsObj = Object.assign({}, prevArgsObj, {[key]: nextArgsObj[key]})

			if (Object.keys(allArgsObj).length >= arity) {
				return fn(allArgsObj)
			} else {
				return nextCurried(allArgsObj)
			}
		}
	}
	)({})
}

function foo({x, y, z}: Record<string, any> = {}) {
	console.log(`x: ${x} y: ${y} z: ${z}`)
}

const f1 = curryProps(foo, 3)
const f2 = partialProps(foo, {y: 2})

f1({y: 2})({x: 1})({z: 3})
f2({x: 1, z: 3})
