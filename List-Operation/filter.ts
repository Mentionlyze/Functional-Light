interface PredicateFn {
	(...args: any): Boolean
}

function filter(predicateFn: PredicateFn, arr: any[]) {
	const newList = []

	for (let [index, v] of arr.entries()) {
		if (predicateFn(v, index, arr)) {
			newList.push(v)
		}
	}

	return newList
}

function not(predicate: PredicateFn) {
	return function negated(...args: any[]) {
		return !predicate(...args)
	}
}

function isOdd(v: number) {
	return v % 2 === 1
}

const isEven = not(isOdd)

const filterIn = filter

function filterOut(predicateFn: PredicateFn, arr: any[]) {
	return filterIn(not(predicateFn), arr)
}

console.log(filterIn(isOdd, [1, 2, 3, 4, 5]))
console.log(filterOut(isEven, [1, 2, 3, 4, 5]))
