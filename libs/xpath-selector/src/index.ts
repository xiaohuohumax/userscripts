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

type QuickFunc<T extends ReturnType> = <N extends fontoxpath.Node>(expression: string, node?: Node) => fontoxpath.IReturnTypes<N>[ReturnTypeTransition<T>]

export interface XPathSelector {
  <N extends fontoxpath.Node, T extends ReturnType>(options: Options<T>): fontoxpath.IReturnTypes<N>[ReturnTypeTransition<T>]
  selectString: QuickFunc<'string'>
  selectStrings: QuickFunc<'strings'>
  selectNumber: QuickFunc<'number'>
  selectNumbers: QuickFunc<'numbers'>
  selectBoolean: QuickFunc<'boolean'>
  selectNodes: QuickFunc<'nodes'>
  selectFirstNode: QuickFunc<'first-node'>
  selectMap: QuickFunc<'map'>
  selectArray: QuickFunc<'array'>
  selectAllResults: QuickFunc<'all-results'>
}

function createXPathSelector(): XPathSelector {
  function xpathSelector<N extends fontoxpath.Node, T extends ReturnType>(options: Options<T>) {
    return fontoxpath.evaluateXPath<N, ReturnTypeTransition<T>>(
      options.expression,
      options.node || document,
      null,
      null,
      returnTypeTransition(options.returnType),
    )
  }

  xpathSelector.selectString = (expression: string, node?: Node) => xpathSelector({ expression, node, returnType: 'string' })
  xpathSelector.selectStrings = (expression: string, node?: Node) => xpathSelector({ expression, node, returnType: 'strings' })
  xpathSelector.selectNumber = (expression: string, node?: Node) => xpathSelector({ expression, node, returnType: 'number' })
  xpathSelector.selectNumbers = (expression: string, node?: Node) => xpathSelector({ expression, node, returnType: 'numbers' })
  xpathSelector.selectBoolean = (expression: string, node?: Node) => xpathSelector({ expression, node, returnType: 'boolean' })
  xpathSelector.selectNodes = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'nodes'>({ expression, node, returnType: 'nodes' })
  xpathSelector.selectFirstNode = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'first-node'>({ expression, node, returnType: 'first-node' })
  xpathSelector.selectMap = (expression: string, node?: Node) => xpathSelector({ expression, node, returnType: 'map' })
  xpathSelector.selectArray = (expression: string, node?: Node) => xpathSelector({ expression, node, returnType: 'array' })
  xpathSelector.selectAllResults = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'all-results'>({ expression, node, returnType: 'all-results' })

  return xpathSelector
}

export default createXPathSelector()
