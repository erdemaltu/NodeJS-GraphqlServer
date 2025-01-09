import mongoose from "mongoose";
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
    return { count:deleteUsers.deletedCount };
  },
  //event
  createEvent: async (_, { data }, { pubSub, _db }) => {
    const newEvent = new _db.Event({
      ...data,
    });

    const event = await newEvent.save();

    const user = await _db.User.findById(new mongoose.Types.ObjectId(data.user));
    user.events.push(event.id);
    user.save();

    const location = await _db.Location.findById(new mongoose.Types.ObjectId(data.location));
    location.events.push(event.id);
    location.save();

    const eventCount = await _db.Event.countDocuments();

    pubSub.publish("eventCreated", { eventCreated: event });
    pubSub.publish("eventCount", { eventCount });
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
    const eventCount = await _db.Event.countDocuments();

    pubSub.publish("eventDeleted", { eventDeleted: deletedEvent });
    pubSub.publish("eventCount", { eventCount });

    return deletedEvent;
  },
  deleteAllEvents: async (_, __, { _db }) => {
    const deleteEvents = await _db.Event.deleteMany({});
    return { count:deleteEvents.deletedCount, };
  },
  //location
  createLocation: async (_, { data }, { pubSub, _db }) => {
    const newLocation = new _db.Location({
      ...data,
    });

    const location = await newLocation.save();

    pubSub.publish("locationCreated", { locationCreated: location });
    return location;
  },
  updateLocation: async (_, { id, data }, { pubSub, _db }) => {
    const is_location_exist = await _db.Location.findById(id);
    if (!is_location_exist) {
      return new Error("Location not found");
    }
    
    const updatedLocation = await _db.Location.findByIdAndUpdate(id, data, {
      new:true,
    });

    pubSub.publish("locationUpdated", { locationUpdated: updatedLocation });
    return updatedLocation;
  },
  deleteLocation: async (_, { id }, { pubSub, _db }) => {
    const is_location_exist = await _db.Location.findById(id);
    if (!is_location_exist) {
      return new Error("Location not found");
    }
    const deletedLocation = await _db.Location.findByIdAndDelete(id);
    pubSub.publish("locationDeleted", { locationDeleted: deletedLocation });
    return deletedLocation;
  },
  deleteAllLocations: async (_, __, { _db }) => {
    const deleteLocations = await _db.Location.deleteMany({});
    return { count:deleteLocations.deletedCount };
  },
  //participant
  createParticipant: async (_, { data }, { pubSub, _db }) => {
    const newParticipant = new _db.Participant({
      ...data,
    });

    const participant = await newParticipant.save();

    const event = await _db.Event.findById(new mongoose.Types.ObjectId(data.event));
    event.participants.push(participant.id);
    event.save();

    pubSub.publish("participantCreated", { participantCreated: participant });

    return participant;
  },
  updateParticipant: async (_, { id, data }, { pubSub, _db }) => {
    const is_participant_exist = await _db.Participant.findById(id);
    if (!is_participant_exist) {
      return new Error("Participant not found");
    }
    
    const updatedParticipant = await _db.Participant.findByIdAndUpdate(id, data, {
      new:true,
    });

    pubSub.publish("participantUpdated", { participantUpdated: updatedParticipant });
    return updatedParticipant;
  },
  deleteParticipant: async (_, { id }, { pubSub, db }) => {
    const is_participant_exist = await _db.Participant.findById(id);
    if (!is_participant_exist) {
      return new Error("Participant not found");
    }
    const deletedParticipant = await _db.Participant.findByIdAndDelete(id);
    pubSub.publish("participantDeleted", { participantDeleted: deletedParticipant });
    return deletedParticipant;
  },
  deleteAllParticipants: async (_, __, { db }) => {
    const deleteParticipants = await _db.Participant.deleteMany({});
    return { count:deleteParticipants.deletedCount };
  },
};
