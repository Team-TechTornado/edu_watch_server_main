import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  tel: { type: String, required: true, unique: true },
  sex: { type: ["M", "F", "N"], required: true },
  region: { type: String },
  school: { type: String, required: true },
});

const UTeacher = mongoose.model("UTeacher", TeacherSchema);
export default UTeacher;
