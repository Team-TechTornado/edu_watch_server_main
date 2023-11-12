import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: { type: ObjectId, required: true },
  phoneNumber: { type: String, required: true },
  currentStatus: { type: Boolean, default: false },
});

UserSchema.index({ phoneNumber: 1 });

const User = mongoose.model("User", UserSchema);
export default User;
