export function spreadWords(str: string) {
  return String(str)
    .toLowerCase()
    .split(/\s|\b/)
    .filter(function alpha(v) {
      return /^[\w]+$/.test(v)
    })
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

function compose2(fn2: Function, fn1: Function) {
  return function composed(origValue: any) {
    return fn2(fn1(origValue))
  }
}

const letters = compose2(spreadWords, unique)

const chars = letters('How are you Mention?')

console.log(chars)
