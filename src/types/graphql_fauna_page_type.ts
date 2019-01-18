import { GraphQLObjectType, GraphQLList, GraphQLType } from 'graphql';

import GraphQLFaunaCursorType from './graphql_fauna_cursor_type';

class GraphQLFaunaPage extends GraphQLObjectType {
    constructor({ name, type }: { name: string; type: GraphQLType }) {
        super({
            name,
            fields: () => ({
                next: {
                    type: GraphQLFaunaCursorType,
                    resolve: source => source.after,
                },
                previous: {
                    type: GraphQLFaunaCursorType,
                    resolve: source => source.before,
                },
                page: {
                    type: new GraphQLList(type),
                    resolve: source => source.data,
                },
            }),
        });
    }
}

export default GraphQLFaunaPage;
