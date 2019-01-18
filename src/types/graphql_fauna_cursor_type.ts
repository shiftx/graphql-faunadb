import { GraphQLScalarType } from 'graphql';

const GraphQLFaunaCursorType = new GraphQLScalarType({
    name: 'GraphQLFaunaCursorType',
    serialize(value) {
        return Buffer.from(JSON.stringify(value)).toString('base64');
    },
    parseValue(value) {
        return require('faunadb/src/_json').parseJSON(
            Buffer.from(value, 'base64').toString('utf8'),
        );
    },
    parseLiteral(ast) {
        console.log('________');
        console.log(ast);
    },
});

export default GraphQLFaunaCursorType;
