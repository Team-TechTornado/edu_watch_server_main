import jwt from "jsonwebtoken";
import { redisClient } from "./redis";
import { promisify } from "util";

export const generateAccessToken = async (user: {
  id: string;
  userType: string;
}) => {
  return jwt.sign(user, process.env.JWT_SECRET as jwt.Secret, {
    algorithm: "HS256",
    expiresIn: 100 * 60 * 60,
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
    return {
      id: (decoded as { id: string }).id,
      userType: (decoded as { userType: string }).userType,
    };
  } catch (e) {
    //accessToken 만료
    return false;
  }
};

export const generateRefreshToken = () => {
  return jwt.sign({}, process.env.JWT_SECRET as jwt.Secret, {
    algorithm: "HS256",
    expiresIn: 100 * 60 * 60 * 60 * 24 * 14,
  });
};

export const verifyRefreshToken = async (token: string, userId: string) => {
  try {
    await redisClient.connect();
    const refreshToken = await redisClient.get(userId);
    await redisClient.disconnect();
    if (token === refreshToken) {
      const ok = await jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
      return ok;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
