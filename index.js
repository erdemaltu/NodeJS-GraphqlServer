const { createServer } = require('node:http')
const { createPubSub,
  createSchema,
  createYoga } = require('graphql-yoga')

let nanoid;
import("nanoid").then((module) => {
  nanoid = module.nanoid;
});

const { events, locations, users, participants } = require("./data.json");

const typeDefs = /* GraphQL */ `
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

    type DeleteAllOutput {
        count: Int!
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
        deleteUser(id:ID!): User!
        deleteAllUsers: DeleteAllOutput!
        #event
        createEvent(data: createEventInput!): Event!
        updateEvent(id:ID!,data: UpdateEventInput!): Event!
        deleteEvent(id:ID!): Event!
        deleteAllEvents: DeleteAllOutput!
        #location
        createLocation(data: createLocationInput!): Location!
        updateLocation(id:ID!,data: UpdateLocationInput!): Location!
        deleteLocation(id:ID!): Location!
        deleteAllLocations: DeleteAllOutput!
        #participant
        createParticipant(data: createParticipantInput!): Participant!
        updateParticipant(id:ID!,data: UpdateParticipantInput!): Participant!
        deleteParticipant(id:ID!): Participant!
        deleteAllParticipants: DeleteAllOutput!
    }

    type Subscription {
      #user
      userCreated: User!
      userUpdated: User!
      userDeleted: User!
      #event
      eventCreated: Event!
      eventUpdated: Event!
      eventDeleted: Event!
      #location
      locationCreated: Location!
      locationUpdated: Location!
      locationDeleted: Location!
      #participant
      participantCreated: Participant!
      participantUpdated: Participant!
      participantDeleted: Participant!
    }
`;
let globalCounter = 0;

const pubSub = createPubSub();

const context = {
  pubSub
};

const resolvers = {
  Subscription: {
    //user
    userCreated: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("userCreated");
      }
    },
    userUpdated: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("userUpdated");
      }
    },
    userDeleted: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("userDeleted");
      }
    },
    //event
    eventCreated: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("eventCreated");
      }
    },
    eventUpdated: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("eventUpdated");
      }
    },
    eventDeleted: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("eventDeleted");
      }
    },
    //location
    locationCreated: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("locationCreated");
      }
    },
    locationUpdated: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("locationUpdated");
      }
    },
    locationDeleted: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("locationDeleted");
      }
    },
    //participant
    participantCreated: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("participantCreated");
      }
    },
    participantUpdated: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("participantUpdated");
      }
    },
    participantDeleted: {
      subscribe: (_,__,{pubSub}) => {
        return pubSub.subscribe("participantDeleted");
      }
    },
  },
  Mutation: {
    //user
    createUser: (_, {data}, {pubSub}) => {
      const user = {
        id: nanoid(),
        ...data,
      };
      users.push(user);
      pubSub.publish("userCreated", { userCreated: user });
      return user;
    },
    updateUser: (_, {id, data}, {pubSub}) => {
      const userIndex = users.findIndex((user) => user.id == id);
      if (userIndex == -1) {
        return new Error("User not found");
      }
      users[userIndex] = {
        ...users[userIndex],
        ...data,
      };
      pubSub.publish("userUpdated", { userUpdated: users[userIndex] });
      return users[userIndex];
    },
    deleteUser: (_, {id}, {pubSub}) => {
      const userIndex = users.findIndex((user) => user.id == id);
      if (userIndex == -1) {
        return new Error("User not found");
      }
      const deletedUser = users.splice(userIndex, 1);
      pubSub.publish("userDeleted", { userDeleted: deletedUser[0] });
      return deletedUser[0];
    },
    deleteAllUsers: () => {
        const count = users.length;
        users.splice(0, users.length);
        return { count };
    },
    //event
    createEvent: (_, {data }, {pubSub}) => {
      const event = {
        id: nanoid(),
        ...data,
      };
      events.push(event);
      pubSub.publish("eventCreated", { eventCreated: event });
      return event;
    },
    updateEvent: (_, {id, data}, {pubSub}) => {
      const eventIndex = events.findIndex((event) => event.id == id);
      if (eventIndex == -1) {
        return new Error("Event not found");
      }
      events[eventIndex] = {
        ...events[eventIndex],
        ...data,
      };
      pubSub.publish("eventUpdated", { eventUpdated: events[eventIndex] });
      return events[eventIndex];
    },
    deleteEvent: (_, {id}, {pubSub}) => {
        const eventIndex = events.findIndex((event) => event.id == id);
        if (eventIndex == -1) {
            return new Error("Event not found");
        }
        const deletedEvent = events.splice(eventIndex, 1);
        pubSub.publish("eventDeleted", { eventDeleted: deletedEvent[0] });
        return deletedEvent[0];
    },
    deleteAllEvents: () => {
        const count = events.length;
        events.splice(0, events.length);
        return { count };
    },
    //location
    createLocation: (_, {data}, {pubSub}) => {
      const location = {
        id: nanoid(),
        ...data,
      };

      locations.push(location);
      pubSub.publish("locationCreated", { locationCreated: location });
      return location;
    },
    updateLocation: (_, {id, data}, {pubSub}) => {
        const locationIndex = locations.findIndex((location) => location.id == id);
        if (locationIndex == -1) {
            return new Error("Location not found");
        }
        locations[locationIndex] = {
            ...locations[locationIndex],
            ...data,
        };
        pubSub.publish("locationUpdated", { locationUpdated: locations[locationIndex] });
        return locations[locationIndex];
    },
    deleteLocation: (_, {id}, {pubSub}) => {
        const locationIndex = locations.findIndex((location) => location.id == id);
        if (locationIndex == -1) {
            return new Error("Location not found");
        }
        const deletedLocation = locations.splice(locationIndex, 1);
        pubSub.publish("locationDeleted", { locationDeleted: deletedLocation[0] });
        return deletedLocation[0];
    },
    deleteAllLocations: () => {
        const count = locations.length;
        locations.splice(0, locations.length);
        return { count };
    },
    //participant
    createParticipant: (_, {data}, {pubSub}) => {
      const participant = {
        id: nanoid(),
        ...data,
      };
      participants.push(participant);
      pubSub.publish("participantCreated", { participantCreated: participant });
      return participant;
    },
    updateParticipant: (_, {id, data}, {pubSub}) => {
      const participantIndex = participants.findIndex((participant) => participant.id == id);
      if (participantIndex == -1) {
        return new Error("Participant not found");
      }
      participants[participantIndex] = {
        ...participants[participantIndex],
        ...data,
      };
      pubSub.publish("participantUpdated", { participantUpdated: participants[participantIndex] });
      return participants[participantIndex];
    },
    deleteParticipant: (_, {id}, {pubSub}) => {
      const participantIndex = participants.findIndex((participant) => participant.id == id);
      if (participantIndex == -1) {
        return new Error("Participant not found");
      }
      const deletedParticipant = participants.splice(participantIndex, 1);
      pubSub.publish("participantDeleted", { participantDeleted: deletedParticipant[0] });
      return deletedParticipant[0];
    },
    deleteAllParticipants: () => {
        const count = participants.length;
        participants.splice(0, participants.length);
        return { count };
    },
  },
  Query: {
    //user
    users: () => users,
    user: (_, args) => {
      const user = users.find((user) => user.id == args.id);
      if (!user) {
        return new Error("User not found");
      }
      return user;
    },
    //event
    events: () => events,
    event: (_, args) => {
      const event = events.find((event) => event.id == args.id);
      if (!event) {
        return new Error("Event not found");
      }
      return event;
    },
    //location
    locations: () => locations,
    location: (_, args) => {
      const location = locations.find((location) => location.id == args.id);
      if (!location) {
        return new Error("Location not found");
      }
      return location;
    },
    //participant
    participants: () => participants,
    participant: (_, args) => {
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

const yoga = createYoga({
  schema: createSchema({
    resolvers,
    typeDefs,
  }),
  logging: true,
  context,
});

const server = createServer(yoga);
server.listen(4000, () => console.log('🚀 Server is running on http://localhost:4000/graphql'));
