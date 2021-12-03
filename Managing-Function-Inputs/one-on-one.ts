function identity(v: any) {
  return v
}

/**
 * @or the ES6 => arrow form
 */

const words: string[] = '    Now is the time for all...    '.split(/\s|\b/)

words.filter(identity)

console.log(words)
