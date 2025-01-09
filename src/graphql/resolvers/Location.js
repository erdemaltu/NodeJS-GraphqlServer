const Location = {
  events: (parent, __, { db }) => {
    return db.events.filter((event) => event.location_id == parent.id);
  },
};

module.exports.Location = Location;
