const { createServer } = require("node:http");
const { createPubSub, createSchema, createYoga } = require("graphql-yoga");

const resolvers = require('./graphql/resolvers')

const pubSub = require("./pubsub");


const db = require("./data.json");

const { readFileSync } = require("node:fs");
const typeDefs = readFileSync(`${__dirname}/graphql/schema.graphql`, "utf8");
let globalCounter = 0;

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
