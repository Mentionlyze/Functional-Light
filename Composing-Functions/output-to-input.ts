const text =
  'To compose two function together, pass the \
output of the first function call as the input of the \
second function call.'

function spreadWords(str: string) {
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

//const wordsFound = spreadWords(text)
//const wordsUsed = unique(wordsFound)

const wordsUsed = unique(spreadWords(text))

console.log(wordsUsed)

function uniqueWords(str: string) {
  return unique(spreadWords(str))
}
