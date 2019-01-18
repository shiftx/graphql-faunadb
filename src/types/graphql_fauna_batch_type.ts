import {
    GraphQLObjectType,
    GraphQLObjectTypeConfig,
    GraphQLList,
    GraphQLType,
} from 'graphql';

class GraphQLFaunaBatch<TSource, TContext> extends GraphQLObjectType {
    constructor({
        name,
        type,
        fields = {},
    }: GraphQLObjectTypeConfig<TSource, TContext> & { type: GraphQLType }) {
        super({
            name,
            fields: () => ({
                ...fields,
                items: {
                    type: new GraphQLList(type),
                },
            }),
        });
    }
}

export default GraphQLFaunaBatch;
