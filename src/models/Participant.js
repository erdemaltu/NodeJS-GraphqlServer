import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

export default mongoose.model("Participant", ParticipantSchema);
