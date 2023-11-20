import {
  deleteComment,
  deletePost,
  getComment,
  getPost,
  postComment,
  postPost,
  putComment,
  putPost,
} from "../controllers/communityController";

const express = require("express");
const communityRouter = express.Router();

communityRouter.get("/post", getPost);
communityRouter.post("/post", postPost);
communityRouter.put("/post/:postId", putPost);
communityRouter.delete("/post/:postId", deletePost);

communityRouter.get("/comment/:postId", getComment);
communityRouter.post("/comment/:postId", postComment);
communityRouter.put("/comment/:commentId", putComment);
communityRouter.delete("/comment/:commentId", deleteComment);

export default communityRouter;
