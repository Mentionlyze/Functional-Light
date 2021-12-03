/**
 * 
 * @alias Unique
 */
function unique(arr: any[]) {
	return arr.filter((v, index) => arr.indexOf(v) === index)
}

console.log(unique([1, 4, 7, 1, 3, 1, 7, 9, 2, 6, 4, 0, 5, 3]))

/**
 * @alias Flatten
 */
function flatten(arr: any[]): any[] {
	return arr.reduce((list: any[], v: any) => list.concat(Array.isArray(v) ? flatten(v) : v), [])
}

console.log(flatten([[0, 1], 2, 3, [4, [5, 6, 7], [8, [9, [10, [11, 12], 13]]]]]))

function flatten1(arr: any[], depth = Infinity): any[] {
	return arr.reduce((list, v) =>
		list.concat(depth > 0 ?
			(depth > 1 && Array.isArray(v) ? flatten1(v, depth - 1) : v)
			: [v]), [])
}

console.log(flatten1([[0, 1], 2, 3, [4, [5, 6, 7], [8, [9, [10, [11, 12], 13]]]]], 1))

const firstNames = [
	{name: "Jonathan", variations: ["John", "Jon", "Jonny"]},
	{name: "Stephanie", variations: ["Steph", "Stephy"]},
	{name: "Frederick", variations: ["Fred", "Freddy"]}
];

console.log(flatten(firstNames.map(entry => [entry.name, ...entry.variations])))

/**
 * @alias Zip
 */
function zip(arr1: any[], arr2: any[]) {
	const zipped = []

	arr1 = [...arr1]
	arr2 = [...arr2]

	while (arr1.length > 0 && arr2.length > 0) {
		zipped.push([arr1.shift(), arr2.shift()])
	}

	return zipped
}

console.log(zip([1, 3, 5, 7, 9], [2, 4, 6, 8, 10]))

/**
 * @alias Merge
 */
function mergeList(arr1: any[], arr2: any[]) {
	const merged = []

	arr1 = [...arr1]
	arr2 = [...arr2]

	while (arr1.length > 0 || arr2.length > 0) {
		if (arr1.length > 0) {
			merged.push(arr1.shift())
		}
		if (arr2.length > 0) {
			merged.push(arr2.shift())
		}
	}

	return merged
}

function foo(a: string) {
	console.log(this as any)
	console.log(a)
}

foo.apply(this, ['yo'])

function flattenReducer(list: any[], v: any): any[] {
	return list.concat(
		Array.isArray(v) ? v.reduce(flattenReducer, []) : v
	)
}

[[1, 2, 3], 4, 5, [6, [7, 8]]]
	.reduce(flattenReducer, [])
