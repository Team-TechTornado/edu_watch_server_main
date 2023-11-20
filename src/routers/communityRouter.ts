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
import { authJWT } from "../middlewares/authJWT";

const express = require("express");
const communityRouter = express.Router();

communityRouter.get("/post", getPost);
communityRouter.post("/post", authJWT, postPost);
communityRouter.put("/post/:postId", authJWT, putPost);
communityRouter.delete("/post/:postId", authJWT, deletePost);

communityRouter.get("/comment/:postId", getComment);
communityRouter.post("/comment/:postId", authJWT, postComment);
communityRouter.put("/comment/:commentId", authJWT, putComment);
communityRouter.delete("/comment/:commentId", authJWT, deleteComment);

export default communityRouter;
