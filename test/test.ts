type foo = {
  bar: 'bar'
}

const baz: Record<keyof foo, any> = {
  bar: 'yo',
}
