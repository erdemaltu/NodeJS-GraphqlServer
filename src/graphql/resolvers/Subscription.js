export const Subscription = {
  //user
  userCreated: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("userCreated");
    },
  },
  userUpdated: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("userUpdated");
    },
  },
  userDeleted: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("userDeleted");
    },
  },
  //event
  eventCreated: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("eventCreated");
    },
  },
  eventUpdated: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("eventUpdated");
    },
  },
  eventDeleted: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("eventDeleted");
    },
  },
  //location
  locationCreated: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("locationCreated");
    },
  },
  locationUpdated: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("locationUpdated");
    },
  },
  locationDeleted: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("locationDeleted");
    },
  },
  //participant
  participantCreated: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("participantCreated");
    },
  },
  participantUpdated: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("participantUpdated");
    },
  },
  participantDeleted: {
    subscribe: (_, __, { pubSub }) => {
      return pubSub.asyncIterator("participantDeleted");
    },
  },
};
