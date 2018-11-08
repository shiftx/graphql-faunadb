import { GraphQLScalarType } from 'graphql'

const GraphQLTimestamp = new GraphQLScalarType({
  name: 'GraphQLTimestamp',
  serialize(val) {
    const date = new Date(parseInt(val, 0) / 1000)
    return date.toISOString()
  },
  parseValue(val) {
    console.log(val)
    throw new Error('GraphQLTimestamp parseValue not implemented')
  },
  parseLiteral(ast) {
    console.log(ast)
    throw new Error('GraphQLTimestamp parseLiteral not implemented')
  },
})

export default GraphQLTimestamp
