import { NextFunction, Request, Response } from "express";
import errorHandler from "./errorHandler";
import jwt from "jsonwebtoken";
import { userModel } from "../model/userModel";

export const cookieUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurant_token } = req.cookies;
    if (!restaurant_token)
      return next(
        new errorHandler(403, "You Required to register/login first")
      );
    const decode = jwt.verify(restaurant_token, process.env.JWT_SECRET || " ");
    let userId: string | undefined = undefined;
    if (typeof decode == "object" && "userId" in decode) {
      userId = decode.userId;
    } else {
      return next(new errorHandler(404, "Token is Invalid or Unawailable !"));
    }

    const user = await userModel.findById(userId).select("-password").lean();
    if (!user) return next(new errorHandler(404, "User Doesn't exists "));
    return user;
  } catch (error) {
    return undefined;
  }
};
