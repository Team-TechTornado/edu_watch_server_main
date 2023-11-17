import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authJWT = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const result = verifyAccessToken(token);
    if (result) {
      req.params.id = result.id;
      req.params.userType = result.userType.toString(); // 다시 고민하기
      next();
    }
  }
  res.status(401).json();
};