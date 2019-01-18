import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql'

class GraphQLFaunaBatch extends GraphQLObjectType {
  constructor({ name, type, fields = {} }) {
    super({
      name,
      fields: () => ({
        ...fields,
        items: {
          type: new GraphQLList(type),
        },
      }),
    })
  }
}

export default GraphQLFaunaBatch
