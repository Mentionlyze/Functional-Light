function BinaryTree(value: any, parent: any = null, left: any = null, right: any = null) {
	return {value, parent, left, right}
}

const banana = BinaryTree("banana")
const apple = banana.left = BinaryTree("apple", banana)
const cherry = banana.right = BinaryTree("cherry", banana)
const apricot = apple.right = BinaryTree("apricot", apple)
const avocado = apricot.right = BinaryTree("avocado", apricot)
const cantaloupe = cherry.left = BinaryTree("cantaloupe", cherry)
const cucumber = cherry.right = BinaryTree("cucumber", cherry)
const grape = cucumber.right = BinaryTree("grape", cucumber)

BinaryTree.forEach = function forEach(visitFn: Function, node: ReturnType<typeof BinaryTree>) {
	if (node) {
		if (node.left) {
			forEach(visitFn, node.left)
		}

		visitFn(node)

		if (node.right) {
			forEach(visitFn, node.right)
		}
	}
}

BinaryTree.forEach((node: any) => console.log(node.value), banana)

BinaryTree.map = function map(mapperFn: Function, node: ReturnType<typeof BinaryTree>) {
	if (node) {
		const newNode = mapperFn(node)
		newNode.parent = node.parent
		newNode.left = node.left && map(mapperFn, node.left)
		newNode.right = node.right && map(mapperFn, node.right)

		if (newNode.left) {
			newNode.left.parent = newNode
		}
		if (newNode.right) {
			newNode.right.parent = newNode
		}
		return newNode
	}
}

const BANANA = BinaryTree.map((node: ReturnType<typeof BinaryTree>) => BinaryTree(node.value.toUpperCase()), banana)

BinaryTree.forEach((node: any) => console.log(node.value), BANANA)



