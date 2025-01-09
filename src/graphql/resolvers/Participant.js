export const Participant = {
  events: (parent, __, { db }) => {
    return db.events.filter((event) => event.id == parent.event_id);
  },
};
