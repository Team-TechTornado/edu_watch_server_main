import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const StudentSchema = new mongoose.Schema({
  userId: { type: String, unique: true, requried: true },
  password: { type: String, required: true },
  parentId: { type: ObjectId, required: true, ref: "UParent" },
  name: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  birthdate: { type: String, required: true },
  tel: { type: String, required: true, unique: true },
  sex: { type: ["M", "F", "N"], required: true },
  region: { type: String },
  school: { type: String },
});

StudentSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.BYCRYPT_SALT)
    );
  }
});

const UStudent = mongoose.model("UStudent", StudentSchema);
export default UStudent;