import {
  getAccessToken,
  getRefreshToken,
} from "../controllers/authControllers";

const express = require("express");
const authRouter = express.Router();

authRouter.get("/accesstoken", getAccessToken);
authRouter.get("/refreshtoken", getRefreshToken);

export default authRouter;
