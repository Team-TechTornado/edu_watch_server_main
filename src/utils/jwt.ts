import jwt from "jsonwebtoken";
import { getAsync } from "./redis";

export const generateAccessToken = (user: { id: string; userType: string }) => {
  const payload = {
    id: user.id,
    userType: user.userType,
  };

  return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
    return {
      id: (decoded as { id: string }).id,
      userType: (decoded as { userType: number }).userType,
    };
  } catch (e) {
    return null;
  }
};

export const generateRefreshToken = () => {
  return jwt.sign({}, process.env.JWT_SECRET as jwt.Secret, {
    algorithm: "HS256",
    expiresIn: "1m",
  });
};

export const verifyRefreshToken = async (token: string, userId: string) => {
  try {
    const refreshToken = getAsync(userId);
    if (token === refreshToken) {
      jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
