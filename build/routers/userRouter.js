"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userControllers_1 = require("../controllers/userControllers");
const express = require("express");
const userRouter = express.Router();
userRouter.get("/", userControllers_1.getUsers);
userRouter.put("/enter", userControllers_1.enterUser);
userRouter.put("/exit", userControllers_1.exitUser);
exports.default = userRouter;
