export function ajax(url: string, data: Object, callback: Function) {
  // TODO
}

/*
 * partial utility
 */
export function partial(fn: Function, ...presetArgs: any) {
  return function partiallyApplied(...laterArgs: any) {
    return fn(...presetArgs, ...laterArgs)
  }
}

/*
 * present a function getPerson is a partial application of ajax
 */
const getPerson = partial(ajax, 'http://some.api/person')

/*
 * can be rewrite as below --->
 */
const getPerson1 = function partiallyApplied(...laterArgs: any[]) {
  return ajax('http://some.api/person', ...(laterArgs as [data: Object, callback: Function]))
}

/*
 * what about getCurrentUser
 *
 * we can either define getCurrentUser(..) with both the url and data argumemts specified directy version 1, or definegetCurrentUser(..) as a partial application of the getPerson(..)
 */

export let CURRENT_USER_ID: any

// ------> version 1
const getCurrentUser = partial(ajax, 'http://some.api/person', { user: CURRENT_USER_ID })

// ------> version 2
const getCurrentUser1 = partial(getPerson, { user: CURRENT_USER_ID })

// ------> version3 a little closer to the spirit of FP
const getCurrentUser2 = function outerPartiallyApplied(...outerLaterArgs: any[]) {
  const getPerson = function innerPartialApplied(...innerLaterArgs: any[]) {
    return ajax('http://some.api/person', ...(innerLaterArgs as [data: Object, callback: Function]))
  }

  return getPerson({ user: CURRENT_USER_ID }, ...outerLaterArgs)
}

export function add(x: number, y: number) {
  return x + y
}

const res = [1, 2, 3, 4, 5].map(partial(add, 3))

console.log(res)
