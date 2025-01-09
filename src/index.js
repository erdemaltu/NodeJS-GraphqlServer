const { createServer } = require("node:http");
const { createPubSub, createSchema, createYoga } = require("graphql-yoga");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/type-defs");

const pubSub = require("./pubsub");

const db = require("./data.json");

const context = {
  pubSub,
  db,
};

const yoga = createYoga({
  schema: createSchema({
    resolvers,
    typeDefs,
  }),
  logging: true,
  context,
});

const server = createServer(yoga);
server.listen(4000, () =>
  console.log("🚀 Server is running on http://localhost:4000/graphql")
);
