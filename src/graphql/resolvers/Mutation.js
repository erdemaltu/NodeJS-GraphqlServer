import { nanoid } from "nanoid";

export const Mutation = {
  //user
  createUser: async (_, { data }, { pubSub, _db }) => {
    const newUser = new _db.User({
      ...data,
    });

    const user = await newUser.save();

    pubSub.publish("userCreated", { userCreated: user });
    return user;
  },
  updateUser: async (_, { id, data }, { pubSub, _db }) => {
    const is_user_exist = await _db.User.findById(id);
    if (!is_user_exist) {
      return new Error("User not found");
    }
    
    const updatedUser = await _db.User.findByIdAndUpdate(id, data, {
      new:true,
    });

    pubSub.publish("userUpdated", { userUpdated: updatedUser });
    return updatedUser;
  },
  deleteUser: async (_, { id }, { pubSub, _db }) => {
    const is_user_exist = await _db.User.findById(id);
    if (!is_user_exist) {
      return new Error("User not found");
    }
    const deletedUser = await _db.User.findByIdAndDelete(id);
    pubSub.publish("userDeleted", { userDeleted: deletedUser });
    return deletedUser;
  },
  deleteAllUsers: async (_, __, { _db }) => {
    const deleteUsers = await _db.User.deleteMany({});
    return { count:deleteUsers.deletedCount, };
  },
  //event
  createEvent: async (_, { data }, { pubSub, _db }) => {
    const newEvent = new _db.Event({
      ...data,
    });

    const event = await newEvent.save();

    pubSub.publish("eventCreated", { eventCreated: event });
    return event;
  },
  updateEvent: async (_, { id, data }, { pubSub, _db }) => {
    const is_event_exist = await _db.Event.findById(id);
    if (!is_event_exist) {
      return new Error("Event not found");
    }
    
    const updatedEvent = await _db.Event.findByIdAndUpdate(id, data, {
      new:true,
    });

    pubSub.publish("eventUpdated", { eventUpdated: updatedEvent });
    return updatedEvent;
  },
  deleteEvent: async (_, { id }, { pubSub, _db }) => {
    const is_event_exist = await _db.Event.findById(id);
    if (!is_event_exist) {
      return new Error("Event not found");
    }
    const deletedEvent = await _db.Event.findByIdAndDelete(id);
    pubSub.publish("eventDeleted", { eventDeleted: deletedEvent });
    return deletedEvent;
  },
  deleteAllEvents: async (_, __, { _db }) => {
    const deleteEvents = await _db.Event.deleteMany({});
    return { count:deleteEvents.deletedCount, };
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
    const locationIndex = db.locations.findIndex(
      (location) => location.id == id
    );
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
    const locationIndex = db.locations.findIndex(
      (location) => location.id == id
    );
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
