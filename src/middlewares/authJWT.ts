import { NextFunction, Request, Response } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/jwt";
import jwt from "jsonwebtoken";
import { redisClient } from "../utils/redis";

export const authJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.authorization) {
      const accessToken = req.headers.authorization.split("Bearer ")[1];
      const refreshToken = String(req.headers.refresh);
      const result = verifyAccessToken(accessToken);

      if (result) {
        //accessToken 만료 안 됨
        req.params.id = result.id;
        req.params.userType = result.userType;
        return next();
      } else {
        //accessToken 만료 => refreshToken 검사
        const decoded: any = jwt.decode(accessToken);

        if (!decoded) {
          return res.status(401).json({
            errMsg: "Invalid token",
          });
        }
        const ok: any = await verifyRefreshToken(refreshToken, decoded.id);

        if (ok) {
          res.locals.accessToken = await generateAccessToken({
            id: decoded.id,
            userType: decoded.userType,
          });
          req.params.id = decoded.id;
          req.params.userType = decoded.userType;
        } else {
          return res.status(400).json({
            errMsg: "Refresh Token is expired",
          });
        }

        return next();
      }
    }

    return res.status(401).json({
      errMsg: "Authorization header missing",
    });
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(500).json({
      errMsg: "Internal Server Error",
    });
  }
};
