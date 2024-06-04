import { NextFunction, Request, Response } from "express";
import errorHandler from "../utility/errorHandler";
import { userModel } from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookieUser } from "../utility/checkCookie";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, image } = req.body;
    if (!name || !email || !password || !image)
      return next(new errorHandler(403, "Provide all details !"));
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      image,
    });
    if (!newUser) return next(new errorHandler(500, "User doesnt register !"));
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || "jwt"
    );
    return res
      .status(201)
      .cookie("restaurant_token", token, { sameSite: "none", secure: true })
      .json({
        success: true,
        message: "User Registeration Successfull !",
        response: newUser,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "User Registration Fail !" });
  }
};
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new errorHandler(403, "Provide Username and Password !"));
    const user = await userModel.findOne({ email: email });
    if (!user)
      return next(
        new errorHandler(403, `User having ${email}, doesn't exists !`)
      );
    const matchPassword = bcrypt.compare(password, user.password);
    if (!matchPassword)
      return next(new errorHandler(403, "Password is wrong !"));
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "jwt"
    );
    return res
      .status(200)
      .cookie("restaurant_token", token, { sameSite: "none", secure: true })
      .json({ success: true, message: "Login Successful !", response: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "User Login Fail !" });
  }
};
export const userAutoLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { restaurant_token } = req.cookies;
    if (!restaurant_token)
      return next(new errorHandler(403, "Cookie not available !"));
    const user = await cookieUser(req, res, next);
    if (!user)
      return next(new errorHandler(500, "Cookie User Doesn't exists!"));
    return res
      .status(200)
      .json({ success: true, message: "Auto-login Success !", response: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "User Auto Login Fail !" });
  }
};
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await cookieUser(req, res, next);
    if (!user)
      return next(
        new errorHandler(
          500,
          "Cookie User Doesn't exists,while checking Admin Status!"
        )
      );
    if (user && user.isAdmin) {
      return next();
    } else {
      return next(new errorHandler(400, "You are not Admin !"));
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Admin check failed !" });
  }
};

export const logOutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res
      .status(200)
      .cookie("restaurant_token", "", { expires: new Date(0) })
      .json({ success: true, message: "LogOut Successfull !" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "User LogOut Fail !" });
  }
};
