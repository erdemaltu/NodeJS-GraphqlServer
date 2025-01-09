import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    date: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
});

export default mongoose.model('Event', EventSchema);