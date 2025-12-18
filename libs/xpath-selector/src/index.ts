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

export interface XPathSelector {
  <N extends fontoxpath.Node, T extends ReturnType>(options: Options<T>): fontoxpath.IReturnTypes<N>[ReturnTypeTransition<T>]
  selectString: <N extends fontoxpath.Node>(expression: string, node?: Node) => fontoxpath.IReturnTypes<N>[ReturnTypeTransition<'string'>]
  selectStrings: <N extends fontoxpath.Node>(expression: string, node?: Node) => fontoxpath.IReturnTypes<N>[ReturnTypeTransition<'strings'>]
  selectNumber: <N extends fontoxpath.Node>(expression: string, node?: Node) => fontoxpath.IReturnTypes<N>[ReturnTypeTransition<'number'>]
  selectNumbers: <N extends fontoxpath.Node>(expression: string, node?: Node) => fontoxpath.IReturnTypes<N>[ReturnTypeTransition<'numbers'>]
  selectBoolean: <N extends fontoxpath.Node>(expression: string, node?: Node) => fontoxpath.IReturnTypes<N>[ReturnTypeTransition<'boolean'>]
  selectNodes: <N extends fontoxpath.Node>(expression: string, node?: Node) => fontoxpath.IReturnTypes<N>[ReturnTypeTransition<'nodes'>]
  selectFirstNode: <N extends fontoxpath.Node>(expression: string, node?: Node) => fontoxpath.IReturnTypes<N>[ReturnTypeTransition<'first-node'>]
  selectMap: <N extends fontoxpath.Node>(expression: string, node?: Node) => fontoxpath.IReturnTypes<N>[ReturnTypeTransition<'map'>]
  selectArray: <N extends fontoxpath.Node>(expression: string, node?: Node) => fontoxpath.IReturnTypes<N>[ReturnTypeTransition<'array'>]
  selectAllResults: <N extends fontoxpath.Node>(expression: string, node?: Node) => fontoxpath.IReturnTypes<N>[ReturnTypeTransition<'all-results'>]
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

  xpathSelector.selectString = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'string'>({ expression, node, returnType: 'string' })
  xpathSelector.selectStrings = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'strings'>({ expression, node, returnType: 'strings' })
  xpathSelector.selectNumber = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'number'>({ expression, node, returnType: 'number' })
  xpathSelector.selectNumbers = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'numbers'>({ expression, node, returnType: 'numbers' })
  xpathSelector.selectBoolean = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'boolean'>({ expression, node, returnType: 'boolean' })
  xpathSelector.selectNodes = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'nodes'>({ expression, node, returnType: 'nodes' })
  xpathSelector.selectFirstNode = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'first-node'>({ expression, node, returnType: 'first-node' })
  xpathSelector.selectMap = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'map'>({ expression, node, returnType: 'map' })
  xpathSelector.selectArray = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'array'>({ expression, node, returnType: 'array' })
  xpathSelector.selectAllResults = <N extends fontoxpath.Node>(expression: string, node?: Node) => xpathSelector<N, 'all-results'>({ expression, node, returnType: 'all-results' })

  return xpathSelector
}

export default createXPathSelector()
