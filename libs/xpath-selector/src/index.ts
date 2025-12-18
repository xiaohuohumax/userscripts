import fontoxpath from 'fontoxpath'

export type ReturnType =
  'string'
  | 'strings'
  | 'number'
  | 'numbers'
  | 'boolean'
  | 'nodes'
  | 'first-node'
  | 'map'
  | 'array'
  | 'all-results'

export interface Options<T> {
  expression: string
  returnType: T
  node?: Node
}

type ReturnTypeTransition<T extends ReturnType> = {
  'string': fontoxpath.ReturnType.STRING
  'strings': fontoxpath.ReturnType.STRINGS
  'number': fontoxpath.ReturnType.NUMBER
  'numbers': fontoxpath.ReturnType.NUMBERS
  'boolean': fontoxpath.ReturnType.BOOLEAN
  'nodes': fontoxpath.ReturnType.NODES
  'first-node': fontoxpath.ReturnType.FIRST_NODE
  'map': fontoxpath.ReturnType.MAP
  'array': fontoxpath.ReturnType.ARRAY
  'all-results': fontoxpath.ReturnType.ALL_RESULTS
}[T]

function returnTypeTransition<T extends ReturnType>(returnType: T): ReturnTypeTransition<T> {
  const returnTypeMap: { [key in ReturnType]: ReturnTypeTransition<key> } = {
    'string': fontoxpath.ReturnType.STRING,
    'strings': fontoxpath.ReturnType.STRINGS,
    'number': fontoxpath.ReturnType.NUMBER,
    'numbers': fontoxpath.ReturnType.NUMBERS,
    'boolean': fontoxpath.ReturnType.BOOLEAN,
    'nodes': fontoxpath.ReturnType.NODES,
    'first-node': fontoxpath.ReturnType.FIRST_NODE,
    'map': fontoxpath.ReturnType.MAP,
    'array': fontoxpath.ReturnType.ARRAY,
    'all-results': fontoxpath.ReturnType.ALL_RESULTS,
  }

  if (!returnTypeMap[returnType]) {
    throw new Error(`Invalid return type: ${returnType}, expected one of ${Object.keys(returnTypeMap).join(', ')}`)
  }

  return returnTypeMap[returnType]
}

export default function xpathSelector<N extends fontoxpath.Node, T extends ReturnType>(options: Options<T>) {
  return fontoxpath.evaluateXPath<N, ReturnTypeTransition<T>>(
    options.expression,
    options.node || document,
    null,
    null,
    returnTypeTransition(options.returnType),
  )
}
