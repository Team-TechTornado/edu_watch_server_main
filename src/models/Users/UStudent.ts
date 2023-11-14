import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  parentId: { type: ObjectId, required: true, ref: "UParent" },
  name: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  birthdate: { type: String, required: true },
  tel: { type: String, required: true, unique: true },
  sex: { type: ["M", "F", "N"], required: true },
  region: { type: String },
  school: { type: String },
});

const UStudent = mongoose.model("UStudent", StudentSchema);
export default UStudent;
