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

export interface Options<T extends ReturnType> {
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

export type SelectorReturn<N extends fontoxpath.Node, T extends ReturnType> = fontoxpath.IReturnTypes<N>[ReturnTypeTransition<T>]

export interface XPathSelector {
  // Common functions
  (options: Options<'string'>): SelectorReturn<fontoxpath.Node, 'string'>
  (options: Options<'strings'>): SelectorReturn<fontoxpath.Node, 'strings'>
  (options: Options<'number'>): SelectorReturn<fontoxpath.Node, 'number'>
  (options: Options<'numbers'>): SelectorReturn<fontoxpath.Node, 'numbers'>
  (options: Options<'boolean'>): SelectorReturn<fontoxpath.Node, 'boolean'>
  <N extends fontoxpath.Node>(options: Options<'nodes'>): SelectorReturn<N, 'nodes'>
  <N extends fontoxpath.Node>(options: Options<'first-node'>): SelectorReturn<N, 'first-node'>
  (options: Options<'map'>): SelectorReturn<fontoxpath.Node, 'map'>
  (options: Options<'array'>): SelectorReturn<fontoxpath.Node, 'array'>
  <N extends fontoxpath.Node>(options: Options<'all-results'>): SelectorReturn<N, 'all-results'>
  // Quick functions
  selectString: (expression: string, node?: Node) => SelectorReturn<fontoxpath.Node, 'string'>
  selectStrings: (expression: string, node?: Node) => SelectorReturn<fontoxpath.Node, 'strings'>
  selectNumber: (expression: string, node?: Node) => SelectorReturn<fontoxpath.Node, 'number'>
  selectNumbers: (expression: string, node?: Node) => SelectorReturn<fontoxpath.Node, 'numbers'>
  selectBoolean: (expression: string, node?: Node) => SelectorReturn<fontoxpath.Node, 'boolean'>
  selectNodes: <N extends fontoxpath.Node>(expression: string, node?: Node) => SelectorReturn<N, 'nodes'>
  selectFirstNode: <N extends fontoxpath.Node>(expression: string, node?: Node) => SelectorReturn<N, 'first-node'>
  selectMap: (expression: string, node?: Node) => SelectorReturn<fontoxpath.Node, 'map'>
  selectArray: (expression: string, node?: Node) => SelectorReturn<fontoxpath.Node, 'array'>
  selectAllResults: <N extends fontoxpath.Node>(expression: string, node?: Node) => SelectorReturn<N, 'all-results'>
}

function createXPathSelector(): XPathSelector {
  function xpathSelector<N extends fontoxpath.Node, T extends ReturnType>(options: Options<T>): SelectorReturn<N, T> {
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
