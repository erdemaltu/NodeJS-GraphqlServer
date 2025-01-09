let nanoid;
import("nanoid").then((module) => {
  nanoid = module.nanoid;
});

const Mutation = {
  //user
  createUser: (_, { data }, { pubSub, db }) => {
    const user = {
      id: nanoid(),
      ...data,
    };
    db.users.push(user);
    pubSub.publish("userCreated", { userCreated: user });
    return user;
  },
  updateUser: (_, { id, data }, { pubSub, db }) => {
    const userIndex = db.users.findIndex((user) => user.id == id);
    if (userIndex == -1) {
      return new Error("User not found");
    }
    users[userIndex] = {
      ...db.users[userIndex],
      ...data,
    };
    pubSub.publish("userUpdated", { userUpdated: db.users[userIndex] });
    return users[userIndex];
  },
  deleteUser: (_, { id }, { pubSub, db }) => {
    const userIndex = db.users.findIndex((user) => user.id == id);
    if (userIndex == -1) {
      return new Error("User not found");
    }
    const deletedUser = db.users.splice(userIndex, 1);
    pubSub.publish("userDeleted", { userDeleted: deletedUser[0] });
    return deletedUser[0];
  },
  deleteAllUsers: (_, __, { db }) => {
    const count = db.users.length;
    db.users.splice(0, db.users.length);
    return { count };
  },
  //event
  createEvent: (_, { data }, { pubSub, db }) => {
    const event = {
      id: nanoid(),
      ...data,
    };
    db.events.push(event);
    pubSub.publish("eventCreated", { eventCreated: event });
    return event;
  },
  updateEvent: (_, { id, data }, { pubSub, db }) => {
    const eventIndex = db.events.findIndex((event) => event.id == id);
    if (eventIndex == -1) {
      return new Error("Event not found");
    }
    db.events[eventIndex] = {
      ...db.events[eventIndex],
      ...data,
    };
    pubSub.publish("eventUpdated", { eventUpdated: db.events[eventIndex] });
    return db.events[eventIndex];
  },
  deleteEvent: (_, { id }, { pubSub, db }) => {
    const eventIndex = db.events.findIndex((event) => event.id == id);
    if (eventIndex == -1) {
      return new Error("Event not found");
    }
    const deletedEvent = db.events.splice(eventIndex, 1);
    pubSub.publish("eventDeleted", { eventDeleted: deletedEvent[0] });
    return deletedEvent[0];
  },
  deleteAllEvents: (_, __, { db }) => {
    const count = db.events.length;
    db.events.splice(0, db.events.length);
    return { count };
  },
  //location
  createLocation: (_, { data }, { pubSub, db }) => {
    const location = {
      id: nanoid(),
      ...data,
    };

    db.locations.push(location);
    pubSub.publish("locationCreated", { locationCreated: location });
    return location;
  },
  updateLocation: (_, { id, data }, { pubSub, db }) => {
    const locationIndex = db.locations.findIndex((location) => location.id == id);
    if (locationIndex == -1) {
      return new Error("Location not found");
    }
    db.locations[locationIndex] = {
      ...db.locations[locationIndex],
      ...data,
    };
    pubSub.publish("locationUpdated", {
      locationUpdated: db.locations[locationIndex],
    });
    return db.locations[locationIndex];
  },
  deleteLocation: (_, { id }, { pubSub, db }) => {
    const locationIndex = db.locations.findIndex((location) => location.id == id);
    if (locationIndex == -1) {
      return new Error("Location not found");
    }
    const deletedLocation = db.locations.splice(locationIndex, 1);
    pubSub.publish("locationDeleted", {
      locationDeleted: deletedLocation[0],
    });
    return deletedLocation[0];
  },
  deleteAllLocations: (_, __, { db }) => {
    const count = db.locations.length;
    db.locations.splice(0, db.locations.length);
    return { count };
  },
  //participant
  createParticipant: (_, { data }, { pubSub, db }) => {
    const participant = {
      id: nanoid(),
      ...data,
    };
    db.participants.push(participant);
    pubSub.publish("participantCreated", { participantCreated: participant });
    return participant;
  },
  updateParticipant: (_, { id, data }, { pubSub, db }) => {
    const participantIndex = db.participants.findIndex(
      (participant) => participant.id == id
    );
    if (participantIndex == -1) {
      return new Error("Participant not found");
    }
    db.participants[participantIndex] = {
      ...db.participants[participantIndex],
      ...data,
    };
    pubSub.publish("participantUpdated", {
      participantUpdated: db.participants[participantIndex],
    });
    return db.participants[participantIndex];
  },
  deleteParticipant: (_, { id }, { pubSub, db }) => {
    const participantIndex = db.participants.findIndex(
      (participant) => participant.id == id
    );
    if (participantIndex == -1) {
      return new Error("Participant not found");
    }
    const deletedParticipant = db.participants.splice(participantIndex, 1);
    pubSub.publish("participantDeleted", {
      participantDeleted: deletedParticipant[0],
    });
    return deletedParticipant[0];
  },
  deleteAllParticipants: (_, __, { db }) => {
    const count = db.participants.length;
    db.participants.splice(0, db.participants.length);
    return { count };
  },
};

module.exports.Mutation = Mutation;
