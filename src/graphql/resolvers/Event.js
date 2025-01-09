export const Event = {
  user: async (parent, __, { _db }) => await _db.User.findById(parent.user),
  location: async (parent, __, { _db }) => await _db.Location.findById(parent.location),
  participants: async (parent, __, { _db }) => await _db.Participant.find({event: parent.id})
};

