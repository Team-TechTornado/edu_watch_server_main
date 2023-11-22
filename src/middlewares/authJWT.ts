import { NextFunction, Request, Response } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt";
import jwt from 'jsonwebtoken';

export const authJWT = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const result = verifyAccessToken(token);
    if (result) {
      req.params.id = result.id;
      req.params.userType = result.userType;
      return next();
    } else {
      // Access Token 만료되었을 때
      const decoded = jwt.decode(token)
      //1. Refresh Token 은 만료되지 않았을 때
      // if (verifyRefreshToken(token, decoded))

      //2. Refresh Token 도 만료되었을 때
    }
  }
  return res.status(401).json({
    errMsg: "JWT Error : Unknown",
  });
};
