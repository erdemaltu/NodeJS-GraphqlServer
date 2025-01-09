export const User = {
  events: async (parent, __, { _db }) => await _db.Event.find({user: parent.id})
};
