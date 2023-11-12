import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  entering: { type: Boolean, required: true },
});
const UserLogSchema = new mongoose.Schema({
  userId: { type: ObjectId, required: true, ref: "User" },
  logs: [LogSchema] || [],
});

LogSchema.index({ time: 1 });
UserLogSchema.index({ userid: 1 });

const UserLogs = mongoose.model("UserLogs", UserLogSchema);
export default UserLogs;
