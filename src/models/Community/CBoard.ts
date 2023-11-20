import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: Number, required: true },
});

const CBoard = mongoose.model("CBoard", BoardSchema);
export default CBoard;
