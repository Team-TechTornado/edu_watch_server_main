import { getUsers, enterUser, exitUser } from "../controllers/userControllers";

const express = require("express");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.put("/enter", enterUser);
userRouter.put("/exit", exitUser);
export default userRouter;
