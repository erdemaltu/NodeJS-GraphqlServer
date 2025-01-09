import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  lat: { type: String, required: true },
  lng: { type: String, required: true },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

export default mongoose.model("Location", LocationSchema);
