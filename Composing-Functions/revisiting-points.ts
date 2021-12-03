function ajax(url: string, data: Record<string, any>, callback: Function) {
	// TODO
}

function output(text: any) {
	console.log(text)
}

function partial(fn: Function, ...presetArgs: any[]) {
	return function partiallyApplied(...laterArgs: any[]) {
		return fn(...presetArgs, ...laterArgs)
	}
}

function partialRight(fn: Function, ...presetArgs: any[]) {
	return function partiallyApplied(...laterArgs: any[]) {
		return fn(...laterArgs, ...presetArgs)
	}
}

function prop(name: string, obj: Record<string, any>) {
	return obj[name]
}

function setProp(name: string, obj: Record<string, any>, val: any) {
	const o = Object.assign({}, obj)
	o[name] = val
}

function makeObjProp(name: string, val: any) {
	return setProp(name, {}, val)
}

function compose(...fns: Function[]) {
	return function composed(result: any) {
		return [...fns].reverse().reduce(function reducer(result, fn) {
			return fn(result)
		}, result)
	}
}

partial(ajax, 'http://some.api/order', {id: 1})
	(
		compose(
			partialRight(
				partial(ajax, 'http://some.api/person'),
				compose(output, partial(prop, 'name')
				),
				partial(makeObjProp, 'id'),
				partial(prop, 'personId')
			)
		)
	)
