const Event = {
  user: (parent, __, { db }) => {
    return db.users.find((user) => user.id == parent.user_id);
  },
  location: (parent, __, { db }) => {
    return db.locations.find((location) => location.id == parent.location_id);
  },
  participants: (parent, __, { db }) => {
    return db.participants.filter(
      (participant) => participant.event_id == parent.id
    );
  },
};

module.exports = Event;
