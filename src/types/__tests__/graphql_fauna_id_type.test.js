import GraphQLFaunaIdType from '../graphql_fauna_id_type'
import { query as q } from 'faunadb'
import { toJSON, parseJSON } from 'faunadb/src/_json'
import v from 'faunadb/src/values'

const FooId = new GraphQLFaunaIdType({ 
  name: 'FooId',
  fauna: { class: 'foo' }
})

describe('serialize id', () => {
  it('serialize', () => {
    // const s = new q.Ref('asdf')
    const ref = new v.Ref('class', new v.Ref('class', new v.Ref('foo')))
    console.log(ref)
    console.log(ref.id)
    // console.log(new v.Ref('112341', new v.Ref('class', new v.Ref('foo'))))
    // console.log(toJSON(q.Ref(q.Class('foo'), '1'))
    // console.log(parseJSON(toJSON(q.Ref(q.Class('foo'), '1')))
    // const s = parseJSON(toJSON(q.Ref(q.Class('foo'), '1')))
    // console.log(s)
    const res = FooId.serialize(ref)
    expect(res).toBe('s')
  })
})

// describe('parse timestamp', () => {
//   test('parse iso8601 nanosecond precision', () => {
//     const res = GraphQLTimestampType.parseValue(ISO_STRING_N)
//     expect(res).toEqual(TIMESTAMP_N)
//   })
// })
