import mongoose from "mongoose";
// import bcrypt from "bcrypt";
const {hash } = require("bcryptjs");

const TeacherSchema = new mongoose.Schema({
  userId: { type: String, unique: true, requried: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  birthdate: { type: String, required: true },
  tel: { type: String, required: true, unique: true },
  sex: { type: ["M", "F", "N"], required: true },
  region: { type: String },
  school: { type: String, required: true },
});

TeacherSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(
      this.password,
      Number(process.env.BYCRYPT_SALT)
    );
  }
});

const UTeacher = mongoose.model("UTeacher", TeacherSchema);
export default UTeacher;
