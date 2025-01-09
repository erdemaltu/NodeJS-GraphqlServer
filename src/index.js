import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';

import resolvers from '@resolvers';
import typeDefs from '@type-defs';

import pubSub from './pubsub';

import db from './db';
db();

import User from './models/User';
import Event from './models/Event';

//fake data
import data from './data.json';

const context = {
  pubSub,
  db:data,
  _db:{
    User,
    Event,
  }
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
