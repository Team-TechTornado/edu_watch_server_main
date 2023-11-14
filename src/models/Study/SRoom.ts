import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import UStudent from "../Users/UStudent";

const RoomSchema = new mongoose.Schema({
  teacherId: { type: ObjectId, required: true, ref: "UTeacher" },
  maxStdNumber: { type: Number, required: true, default: 15 },
  students: { type: [] || [UStudent], required: true, default: [] },
  nickname: { type: String, required: true, unique: true },
  teacherStatus: { type: Boolean, required: true, default: true },
});

const SRoom = mongoose.model("SRoom", RoomSchema);
export default SRoom;
