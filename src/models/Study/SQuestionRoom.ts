import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const QuestionRoomSchema = new mongoose.Schema({
  originRoomId: { type: ObjectId, required: true, ref: "SRoom" },
  teacherId: { type: ObjectId, required: true, ref: "UTeacher" },
  studentId: { type: ObjectId, required: true, ref: "UStudent" },
  startTime: { type: Date, required: true, default: Date.now },
  endTime: { type: Date, required: true },
  contents: { type: String, required: true },
});

const SQuestionRoom = mongoose.model("SQuestionRoom", QuestionRoomSchema);
export default SQuestionRoom;
