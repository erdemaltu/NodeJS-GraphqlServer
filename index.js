const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
let nanoid;
import("nanoid").then((module) => {
  nanoid = module.nanoid;
});
const { events, locations, users, participants } = require("./data.json");
const { create } = require("ts-node");

const typeDefs = gql`
    #User
    type User {
        id: ID!
        username: String!
        email: String!
        events: [Event!]!
    }
    input createUserInput {
        username: String!
        email: String!
    }
    input UpdateUserInput {
        username: String
        email: String
    }

    #Event
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

    input createEventInput {
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: ID!
        user_id: ID!
    }

    input UpdateEventInput {
        title: String
        desc: String
        date: String
        from: String
        to: String
        location_id: ID
        user_id: ID
    }

    #Location
    type Location {
        id: ID!
        name: String!
        desc: String!
        lat: String!
        lng: String!
        events: [Event!]!
    }

    input createLocationInput {
        name: String!
        desc: String!
        lat: String!
        lng: String!
    }

    input UpdateLocationInput {
        name: String
        desc: String
        lat: String
        lng: String
    }

    #Participant
    type Participant {
        id: ID!
        user_id: ID!
        event_id: ID!
        events: [Event!]!
    }
    input createParticipantInput {
        user_id: ID!
        event_id: ID!
    }
    input UpdateParticipantInput {
        user_id: ID
        event_id: ID
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

    type Mutation {
        #user
        createUser(data: createUserInput!): User!
        updateUser(id:ID!,data: UpdateUserInput! ): User!
        #event
        createEvent(data: createEventInput!): Event!
        updateEvent(id:ID!,data: UpdateEventInput!): Event!
        #location
        createLocation(data: createLocationInput!): Location!
        updateLocation(id:ID!,data: UpdateLocationInput!): Location!
        #participant
        createParticipant(data: createParticipantInput!): Participant!
        updateParticipant(id:ID!,data: UpdateParticipantInput!): Participant!
    }
`;

const resolvers = {
  Mutation: {
    //user
    createUser: (parent, {data}) => {
      const user = {
        id: nanoid(),
        ...data,
      };
      users.push(user);
      return user;
    },
    updateUser: (parent, {id, data}) => {
      const userIndex = users.findIndex((user) => user.id == id);
      if (userIndex == -1) {
        return new Error("User not found");
      }
      users[userIndex] = {
        ...users[userIndex],
        ...data,
      };
      return users[userIndex];
    },
    //event
    createEvent: (parent, {data }) => {
      const event = {
        id: nanoid(),
        ...data,
      };
      events.push(event);
      return event;
    },
    updateEvent: (parent, {id, data}) => {
      const eventIndex = events.findIndex((event) => event.id == id);
      if (eventIndex == -1) {
        return new Error("Event not found");
      }
      events[eventIndex] = {
        ...events[eventIndex],
        ...data,
      };
      return events[eventIndex];
    },
    //location
    createLocation: (parent, {data}) => {
      const location = {
        id: nanoid(),
        ...data,
      };

      locations.push(location);
      return location;
    },
    updateLocation: (parent, {id, data}) => {
        const locationIndex = locations.findIndex((location) => location.id == id);
        if (locationIndex == -1) {
            return new Error("Location not found");
        }
        locations[locationIndex] = {
            ...locations[locationIndex],
            ...data,
        };
        return locations[locationIndex];
    },
    //participant
    createParticipant: (parent, {data}) => {
      const participant = {
        id: nanoid(),
        ...data,
      };
      participants.push(participant);
      return participant;
    },
    updateParticipant: (parent, {id, data}) => {
      const participantIndex = participants.findIndex((participant) => participant.id == id);
      if (participantIndex == -1) {
        return new Error("Participant not found");
      }
      participants[participantIndex] = {
        ...participants[participantIndex],
        ...data,
      };
      return participants[participantIndex];
    }
  },
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
      const participant = participants.find(
        (participant) => participant.id == args.id
      );
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
      return participants.filter(
        (participant) => participant.event_id == parent.id
      );
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
