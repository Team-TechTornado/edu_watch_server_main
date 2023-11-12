import User from "../models/User";

//학부모의 전화번호를 받아 id 반환
export const postUsers = async (req, res) => {
  const { phoneNumber } = req.body;

  const { id } = await User.findOne({ phoneNumber });
  return Boolean(id) ? res.status(200).json({ id }) : res.status(400);
};
