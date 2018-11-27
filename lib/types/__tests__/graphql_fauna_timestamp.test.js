import GraphQLTimestamp from '../graphql_fauna_timestamp'

const TIMESTAMP_N = 1542718688123456
const TIMESTAMP_MS = 1542718688123
const TIMESTAMP_S = 1542718688
const ISO_STRING_N = '2018-11-20T12:58:08.123456Z'
const ISO_STRING_MS = '2018-11-20T12:58:08.123Z'
const ISO_STRING_S = '2018-11-20T12:58:08Z'

describe('timestamp', () => {
  test('serialice nanosecond precision ts', () => {
    const res = GraphQLTimestamp.serialize(TIMESTAMP_N)
    expect(res).toBe(ISO_STRING_N)
  })

  test('serialice millisecond precision ts', () => {
    const res = GraphQLTimestamp.serialize(TIMESTAMP_MS)
    expect(res).toBe(ISO_STRING_MS)
  })
  test('serialice second precision ts', () => {
    const res = GraphQLTimestamp.serialize(TIMESTAMP_S)
    expect(res).toBe(ISO_STRING_S)
  })
  
  test('parse iso8601 nanosecond precision', () => {
    const res = GraphQLTimestamp.parseValue(ISO_STRING_N)
    expect(res).toEqual(TIMESTAMP_N)
  })

  test('parse iso8601 millisecond precision', () => {
    const res = GraphQLTimestamp.parseValue(ISO_STRING_MS)
    expect(res).toEqual(TIMESTAMP_MS * 1000)
  })

  test('parse iso8601 second precision', () => {
    const res = GraphQLTimestamp.parseValue(ISO_STRING_S)
    expect(res).toEqual(TIMESTAMP_S * 1000000)
  })
})
