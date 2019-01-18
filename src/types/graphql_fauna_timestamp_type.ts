import { GraphQLScalarType } from 'graphql';

function digitsFromInt(int: number) {
    return Math.floor(Math.log10(int) + 1);
}

function intToNanoUnix(int: number) {
    const digits = digitsFromInt(int);
    switch (digits) {
        case 16:
            return int;
        case 13:
            return int * 1000;
        case 10:
            return int * 1000000;
        default:
            throw new Error('Unsupported unix timestamp digit length');
    }
}

function toISO8601StringWithNanoseconds(int: number) {
    const digits = digitsFromInt(int);
    let date;
    let remainder = '';
    let millis = true;
    switch (digits) {
        case 16:
            date = new Date(int / 1000);
            remainder = (int % 1000).toString();
            break;
        case 13:
            date = new Date(int);
            break;
        case 10:
            date = new Date(int * 1000);
            millis = false;
            break;
        default:
            throw new Error('Unsupported unix timestamp digit length');
    }

    let string = date.toISOString().slice(0, -5);
    if (millis) string += `.${date.getUTCMilliseconds()}${remainder}`;
    string += 'Z';
    return string;
}

function fromISO8601StringWithNanoseconds(string: string) {
    const match = string.match(/\.(\d+)Z$/);
    const subSeconds = match ? parseInt(match[1], 0) : 0;
    const digits = Math.floor(Math.log10(subSeconds) + 1);
    let unix = Date.parse(string) * 1000;
    if (digits === 6) unix += subSeconds % 1000;
    return unix;
}

const GraphQLFaunaTimestampType = new GraphQLScalarType({
    name: 'GraphQLFaunaTimestampType',
    serialize(val) {
        return toISO8601StringWithNanoseconds(val);
    },
    parseValue(val) {
        if (Number.isInteger(val)) return intToNanoUnix(val);
        return fromISO8601StringWithNanoseconds(val);
    },
    parseLiteral(ast) {
        console.log(ast);
        throw new Error('GraphQLTimestamp parseLiteral not implemented');
    },
});

export default GraphQLFaunaTimestampType;
