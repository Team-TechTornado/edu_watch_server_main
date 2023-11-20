import { Request, Response } from "express";
import UStudent from "../models/User/UStudent";
import UParent from "../models/User/UParent";
import UTeacher from "../models/User/UTeacher";
import { compare } from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { redisClient } from "../utils/redis";

export const postStudentJoin = async (req: Request, res: Response) => {
  const formData = req.body;
  const checkId = await UStudent.exists({ userId: formData.userId });
  if (checkId) {
    return res.status(401).json();
  }
  const checkNickname = await UStudent.exists({ nickname: formData.nickname });
  if (checkNickname) {
    return res.status(402).json();
  }
  const checkTel = await UStudent.exists({ tel: formData.tel });
  if (checkTel) {
    return res.status(403).json();
  }

  try {
    await UStudent.create(req.body);
    return res.status(200).json();
  } catch (e) {
    return res.status(405).json(e);
  }
};

export const postParentJoin = async (req: Request, res: Response) => {
  const formData = req.body;
  const checkId = await UParent.exists({ userId: formData.userId });
  if (checkId) {
    return res.status(401).json();
  }
  const checkNickname = await UParent.exists({ nickname: formData.nickname });
  if (checkNickname) {
    return res.status(402).json();
  }
  const checkTel = await UParent.exists({ tel: formData.tel });
  if (checkTel) {
    return res.status(403).json();
  }

  try {
    await UParent.create(req.body);
    return res.status(200).json();
  } catch (e) {
    return res.status(405).json();
  }
};

export const postTeacherJoin = async (req: Request, res: Response) => {
  const formData = req.body;
  const checkId = await UTeacher.exists({ userId: formData.userId });
  if (checkId) {
    return res.status(401).json();
  }
  const checkNickname = await UTeacher.exists({ nickname: formData.nickname });
  if (checkNickname) {
    return res.status(402).json();
  }
  const checkTel = await UTeacher.exists({ tel: formData.tel });
  if (checkTel) {
    return res.status(403).json();
  }

  try {
    await UTeacher.create(req.body);
    return res.status(200).json();
  } catch (e) {
    return res.status(405).json();
  }
};

export const postStudentLogin = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  const student = await UStudent.findOne({ userId });
  if (!student) {
    return res.status(401).json();
  }
  const checkPassWord = await compare(password, student.password);
  if (!checkPassWord) {
    return res.status(402).json();
  }

  const accessToken = await generateAccessToken({
    id: String(student._id),
    userType: "Student",
  });

  const refreshToken = generateRefreshToken();

  await redisClient.connect();
  await redisClient.set(student.id, refreshToken);
  await redisClient.disconnect();

  return res.status(200).json({
    accessToken,
    refreshToken,
  });
};

export const postParentLogin = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  const parent = await UParent.findOne({ userId });
  if (!parent) {
    return res.status(401).json();
  }
  const checkPassWord = await compare(password, parent.password);
  if (!checkPassWord) {
    return res.status(402).json();
  }

  //로그인 성공
  //JWT 발급
  const accessToken = generateAccessToken({
    id: parent.id,
    userType: "Parent",
  });

  const refreshToken = generateRefreshToken();
  await redisClient.connect();
  await redisClient.set(parent.id, refreshToken);
  await redisClient.disconnect();

  return res.status(200).json({
    accessToken,
    refreshToken,
  });
};

export const postTeacherLogin = async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  const teacher = await UTeacher.findOne({ userId });
  if (!teacher) {
    return res.status(401).json();
  }
  const checkPassWord = await compare(password, teacher.password);
  if (!checkPassWord) {
    return res.status(402).json();
  }

  //로그인 성공
  //JWT 발급
  const accessToken = generateAccessToken({
    id: teacher.id,
    userType: "Teacher",
  });

  const refreshToken = generateRefreshToken();
  await redisClient.connect();
  await redisClient.set(teacher.id, refreshToken);
  await redisClient.disconnect();

  return res.status(200).json({
    accessToken,
    refreshToken,
  });
};
