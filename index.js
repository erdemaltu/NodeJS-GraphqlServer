const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { events, locations, users, participants } = require("./data.json");

const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    location: Location!
    user_id: ID!
    user: User!
    participants: [Participant!]!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: String!
    lng: String!
    events: [Event!]!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]!
  }

  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
    events: [Event!]!
  }

  type Query {
    #user
    users: [User!]!
    user(id: ID!): User!
    #event
    events: [Event!]!
    event(id: ID!): Event!
    #location
    locations: [Location!]!
    location(id: ID!): Location!
    #participant
    participants: [Participant!]!
    participant(id: ID!): Participant!
  }
`;

const resolvers = {
  Query: {
    //user
    users: () => users,
    user: (parent, args) => {
      const user = users.find((user) => user.id == args.id);
      if (!user) {
        return new Error("User not found");
      }
      return user;
    },
    //event
    events: () => events,
    event: (parent, args) => {
        const event = events.find((event) => event.id == args.id);
        if (!event) {
            return new Error("Event not found");
        }
        return event;
        },
    //location
    locations: () => locations,
    location: (parent, args) => {
        const location = locations.find((location) => location.id == args.id);
        if (!location) {
            return new Error("Location not found");
        }
        return location;
        },
    //participant
    participants: () => participants,
    participant: (parent, args) => {
        const participant = participants.find((participant) => participant.id == args.id);
        if (!participant) {
            return new Error("Participant not found");
        }
        return participant;
        },
  },
    User: {
        events: (parent) => {
        return events.filter((event) => event.user_id == parent.id);
        },
    },
    Event: {
        user: (parent) => {
        return users.find((user) => user.id == parent.user_id);
        },
        location: (parent) => {
        return locations.find((location) => location.id == parent.location_id);
        },
        participants: (parent) => {
        return participants.filter((participant) => participant.event_id == parent.id);
        },
    },
    Location: {
        events: (parent) => {
        return events.filter((event) => event.location_id == parent.id);
        },
    },
    Participant: {
        events: (parent) => {
        return events.filter((event) => event.id == parent.event_id);
        },
    },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
