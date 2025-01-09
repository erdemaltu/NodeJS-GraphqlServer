export const Location = {
  events: async (parent, __, { _db }) => await _db.Event.find({location: parent.id})
};

