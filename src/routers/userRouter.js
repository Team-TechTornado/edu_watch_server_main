import { postUsers } from "../controllers/userControllers";

const express = require("express");
const userRouter = express.Router();

userRouter.post("/", postUsers);
export default userRouter;
