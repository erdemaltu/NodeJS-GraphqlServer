export const Query = {
  //user
  users: (_,__, { db }) => db.users,
  user: (_, args, { db }) => {
    const user = db.users.find((user) => user.id == args.id);
    if (!user) {
      return new Error("User not found");
    }
    return user;
  },
  //event
  events: (_,__, { db }) => db.events,
  event: (_, args, { db }) => {
    const event = db.events.find((event) => event.id == args.id);
    if (!event) {
      return new Error("Event not found");
    }
    return event;
  },
  //location
  locations: (_,__, { db }) => db.locations,
  location: (_, args, { db }) => {
    const location = db.locations.find((location) => location.id == args.id);
    if (!location) {
      return new Error("Location not found");
    }
    return location;
  },
  //participant
  participants: (_,__, { db }) => db.participants,
  participant: (_, args, { db }) => {
    const participant = db.participants.find(
      (participant) => participant.id == args.id
    );
    if (!participant) {
      return new Error("Participant not found");
    }
    return participant;
  },
};
