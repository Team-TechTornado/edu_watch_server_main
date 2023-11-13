import { Request, Response } from "express";
import User from "../models/User";
import UserLogs from "../models/UserLogs";

//GET 학부모의 전화번호를 받아 id 반환
export const getUsers = async (req: Request, res: Response) => {
  const { phonenumber } = req.params;
  const user = await User.findOne({ phoneNumber: phonenumber });
  if (!Boolean(user) || user === null) {
    return res.status(400).json(); //존재하지 않는 유저
  }

  const log = await UserLogs.findOne({ userId: user._id });
  if (!Boolean(log)) {
    await UserLogs.create({ userId: user._id, logs: [] });
  }

  return res.status(200).json({ _id: user._id }); //유저 아이디 반환
};

// PUT _id를 가진 학생의 상태를 입실 상태로 User에서 갱신. 그리고 userLog에 추가.
export const enterUser = async (req: Request, res: Response) => {
  const { _id } = req.body;

  const user = await User.findOne({ _id });
  if (!Boolean(user) || user === null) {
    return res.status(400).json();
  }
  user.currentStatus = true;
  await user.save();

  const userLogs = await UserLogs.findOne({ userId: _id });
  userLogs!.logs.push({ entering: true });
  await userLogs!.save();
  return res.status(200).json();
};

// PUT _id를 가진 학생의 상태를 퇴실 상태로 User에서 갱신. 그리고 userLog에 추가.
export const exitUser = async (req: Request, res: Response) => {
  const { _id } = req.body;

  const user = await User.findOne({ _id });
  if (!Boolean(user) || user === null) {
    return res.status(400).json();
  }
  user.currentStatus = false;
  await user.save();

  const userLogs = await UserLogs.findOne({ userId: _id });
  userLogs!.logs.push({ entering: false });
  await userLogs!.save();
  return res.status(200).json();
};

// GET _id를 통해 모든 활동 기록 조회
export const getUserLogAll = async (req: Request, res: Response) => {
  const { _id } = req.params;

  const userLogs = await UserLogs.findOne({ userId: _id });
  if (!Boolean(userLogs) || userLogs == null) {
    return res.status(400).json();
  }
  return res.status(200).json(userLogs.logs);
};
