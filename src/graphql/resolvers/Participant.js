export const Participant = {
  events: async (parent, __, { _db }) => await _db.Event.find({participant: parent.id}),
};
