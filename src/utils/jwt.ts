import jwt from "jsonwebtoken";
import { redisClient } from "./redis";
import { promisify } from "util";

export const generateAccessToken = async (user: {
  id: string;
  userType: string;
}) => {
  return jwt.sign(user, process.env.JWT_SECRET as jwt.Secret, {
    algorithm: "HS256",
    expiresIn: "1h",
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
    expiresIn: "2w",
  });
};

export const verifyRefreshToken = async (token: string, userId: string) => {
  try {
    const getAsync = promisify(redisClient.get).bind(redisClient);
    const refreshToken = getAsync(userId);
    if (token === refreshToken) {
      jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
