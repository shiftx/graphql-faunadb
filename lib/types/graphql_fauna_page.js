import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'

import { GraphQLFaunaCursor } from './graphql_fauna_cursor'

class GraphQLFaunaPage extends GraphQLObjectType {
  constructor({ name, type }) {
    super({
      name,
      fields: () => ({
        next: {
          type: GraphQLFaunaCursor,
          resolve: source => source.after,
        },
        previous: {
          type: GraphQLFaunaCursor,
          resolve: source => source.before,
        },
        page: {
          type: new GraphQLList(type),
          resolve: source => source.data,
        },
      }),
    })
  }
}

export default GraphQLFaunaPage
