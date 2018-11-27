import { GraphQLScalarType } from 'graphql'

function pad(number) {
  if (number < 10) return '0' + number
  return number
}

function toISO8601StringWithNanoseconds(int) {
  const digits = Math.floor(Math.log10(int) + 1)
  let date, remainder, millis
  if (digits === 16) {
    date = new Date(int / 1000)
    remainder = int % 1000
    millis = true
  }
  if (digits === 13) {
    date = new Date(int)
    remainder = ''
    millis = true
  }
  if (digits === 10) {
    date = new Date(int * 1000)
    remainder = ''
    millis = false
  }
  
  let string = `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`
    + `T${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`
  if (millis) string += `.${date.getUTCMilliseconds()}${remainder}`
  string += 'Z'
  return string
}

function fromISO8601StringWithNanoseconds(string) {
  const match = string.match(/\.(\d+)Z$/)
  const subSeconds = match ? parseInt(match[1], 0) : 0
  const digits = Math.floor(Math.log10(subSeconds) + 1)
  let unix = Date.parse(string) * 1000
  if (digits === 6) unix += subSeconds % 1000
  return unix
}


const GraphQLTimestamp = new GraphQLScalarType({
  name: 'GraphQLTimestamp',
  serialize(val) {
    return toISO8601StringWithNanoseconds(val)
  },
  parseValue(val) {
    return fromISO8601StringWithNanoseconds(val)
  },
  parseLiteral(ast) {
    console.log(ast)
    throw new Error('GraphQLTimestamp parseLiteral not implemented')
  },
})

export default GraphQLTimestamp
