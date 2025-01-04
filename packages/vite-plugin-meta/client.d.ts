interface Meta {
  VERSION: string
  ID: string
}

declare module 'virtual:meta' {
  const meta: Meta
  export const { VERSION, ID }: Meta
  export default meta
}
