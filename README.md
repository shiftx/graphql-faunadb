# GraphQL-FaunaDB
A collection of types and helpers to pair GraphQL with FaunaDB

## Types


### GraphQLFaunaTimestampType

### GraphQLFaunaPageType

### GraphQLFaunaCursorType

### GraphQLFaunaClassType

####Usage


```js
// const PostId = new GraphQLFaunaIdType({
//   name: 'PostId',
//   fauna: {
//     class: 'posts',
//   }
// })

const Posts = new GraphQLFaunaClassType({
  name: 'Post',
  fields: () => {
    // id: PostId,
    title: GraphQLString,
  },
  fauna: {
    class: 'posts',
  },
})
```
