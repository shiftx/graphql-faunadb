import { query as q } from 'faunadb';
import { GraphQLScalarType } from 'graphql';

function parseFaunaId(val: string, className: string) {
    if (typeof val === 'string' && val.match(/^\d+$/)) {
        return q.Ref(q.Class(className), val);
    }
    throw new Error('unable to parse id');
}

class GraphQLFaunaIdType extends GraphQLScalarType {
    constructor({ name, className }: { name: string; className: string }) {
        super({
            name,
            serialize(val) {
                console.log(val);
                if (typeof val === 'object') {
                    if (val.class.id !== className) {
                        throw new Error(
                            `Ref mismatch. Expecting '${className}' given '${
                                val.class.id
                            }'`,
                        );
                    }
                    return val.id;
                }
                if (typeof val === 'string' && val.match(/^\d+$/)) return val;
                throw new Error(
                    'Error in serialize: this should not ever be reached...',
                );
            },
            parseValue(val) {
                return parseFaunaId(val, className);
            },
            parseLiteral(ast) {
                if (ast.kind === 'StringValue')
                    return parseFaunaId(ast.value, className);
                throw new Error('Failed to parseLiteral');
            },
        });
    }
}

export default GraphQLFaunaIdType;
