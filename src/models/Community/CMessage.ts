import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderId: { type: ObjectId, required: true, ref: "UStudent" },
  recieverId: { type: ObjectId, required: true, ref: "UStudent" },
  createdAt: { type: Date, required: true, default: Date.now },
  contents: { type: String, required: true },
});

const CMessage = mongoose.model("CMessage", MessageSchema);
export default CMessage;
