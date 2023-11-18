import {
  getUsers,
  enterUser,
  exitUser,
  getUserLogAll,
} from "../controllers/prelaunchControllers";

const express = require("express");
const userRouter = express.Router();

userRouter.get("/:phonenumber", getUsers);
userRouter.put("/enter", enterUser);
userRouter.put("/exit", exitUser);
userRouter.get("/:_id/logs", getUserLogAll);

export default userRouter;
