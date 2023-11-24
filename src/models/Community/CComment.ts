import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  writer: { type: ObjectId, required: true, ref: "UStudent" },
  originId: { type: ObjectId, ref: "CComment" },
  postId: { type: ObjectId, ref: "CPost" },
  createdAt: { type: Date, required: true, default: Date.now },
  recCount: { type: Number, required: true, default: 0 },
  comCount: { type: Number, required: true, default: 0 },
  contents: { type: String, required: true },
});

const CComment = mongoose.model("CComment", CommentSchema);
export default CComment;
