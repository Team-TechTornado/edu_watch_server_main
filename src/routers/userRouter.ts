import {
  postParentJoin,
  postParentLogin,
  postStudentJoin,
  postStudentLogin,
  postTeacherJoin,
  postTeacherLogin,
} from "../controllers/userControllers";

const express = require("express");
const userRouter = express.Router();

userRouter.post("/student/login", postStudentLogin);
userRouter.post("/parent/login", postParentLogin);
userRouter.post("/teacher/login", postTeacherLogin);

userRouter.post("/student/join", postStudentJoin);
userRouter.post("/parent/join", postParentJoin);
userRouter.post("/teacher/join", postTeacherJoin);

export default userRouter;
