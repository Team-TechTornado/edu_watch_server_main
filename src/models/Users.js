import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  phonenumber: { type: String, required: true },
});

const User = mongoose.model("user_info", UserSchema);
export default User;
