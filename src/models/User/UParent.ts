import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ParentSchema = new mongoose.Schema({
  studentId: { type: ObjectId, required: true, ref: "UStudent" },
  userId: { type: String, unique: true, requried: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  birthdate: { type: String, required: true },
  tel: { type: String, required: true, unique: true },
  sex: { type: ["M", "F", "N"], required: true },
  region: { type: String },
});

ParentSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.BYCRYPT_SALT)
    );
  }
});

const UParent = mongoose.model("UParent", ParentSchema);
export default UParent;
