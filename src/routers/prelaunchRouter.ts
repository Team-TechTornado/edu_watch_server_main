import {
  getUsers,
  enterUser,
  exitUser,
  getUserLogAll,
} from "../controllers/prelaunchControllers";

const express = require("express");
const prelaunchRouter = express.Router();

prelaunchRouter.get("/:phonenumber", getUsers);
prelaunchRouter.put("/enter", enterUser);
prelaunchRouter.put("/exit", exitUser);
prelaunchRouter.get("/:_id/logs", getUserLogAll);

export default prelaunchRouter;
