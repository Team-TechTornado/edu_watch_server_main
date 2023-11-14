import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  writer: { type: ObjectId, required: true, ref: "UStudent" },
  boardId: { type: ObjectId, required: true, ref: "CBoard" },
  title: { type: String, required: true, maxLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  recCount: { type: Number, required: true, default: 0 },
  comCount: { type: Number, required: true, default: 0 },
  viewCount: { type: Number, required: true, default: 0 },
  contents: { type: String, required: true },
});

const CPost = mongoose.model("CPost", PostSchema);
export default CPost;
