var text1 =
  'To compose two functions together, pass the \
output of the first function call as the input of the \
second function call.'

/**
 * @field
 * finalValue <- func1 <- func2 <- ... <- funcN <- origValue
 */

/*
 
function compose(...fns: Function[]) {
	return function composed(result: any) {
		const list = [...fns]

		while (list.length > 0) {
			result = (list.pop() as Function)(result)
		}

		return result
	}
}

*/

/*
 
function compose(...fns: Function[]) {
	return function composed(result: any) {
		return [...fns].reverse().reduce(function reducer(result, fn) {
			return fn(result)
		}, result)
	}
}

*/

export function compose(...fns: Function[]) {
  return fns.reverse().reduce(function reducer(fn1, fn2) {
    return function composed(...args: any[]) {
      return fn2(fn1(...args))
    }
  })
}

function composeRecursion(...fns: Function[]) {
  const [fn1, fn2, ...rest] = fns.reverse()

  const composedFn = function composed(...args: any[]) {
    return fn2(fn1(...args))
  }

  if (rest.length === 0) return composedFn

  return compose(...rest.reverse(), composedFn)
}

function partialRight(fn: Function, ...presetArgs: any[]) {
  return function partiallyApplied(...laterArgs: any[]) {
    return fn(...laterArgs, ...presetArgs)
  }
}

function spreadWords(str: string) {
  const res = String(str)
    .toLowerCase()
    .split(/\s|\b/)
    .filter(function alpha(v) {
      return /^[\w]+$/.test(v)
    })

  return res
}

function unique(list: any[]) {
  const uniqList = []

  for (let v of list) {
    if (uniqList.indexOf(v) === -1) {
      uniqList.push(v)
    }
  }
  return uniqList
}

function skipShortWords(words: string[]) {
  const filteredWords = []

  for (let word of words) {
    if (word.length > 4) {
      filteredWords.push(word)
    }
  }

  return filteredWords
}

function skipLongWords(words: string[]) {
  const filteredWords = []

  for (let word of words) {
    if (word.length <= 4) {
      filteredWords.push(word)
    }
  }

  return filteredWords
}

const biggerWords = compose(skipShortWords, unique, spreadWords)
const wordsUsed1 = biggerWords(text1)

console.log(wordsUsed1)

const filterWords = partialRight(compose, unique, spreadWords)
const shorterWords = filterWords(skipLongWords)
const wordsUsed2 = shorterWords(text1)

console.log(wordsUsed2)
