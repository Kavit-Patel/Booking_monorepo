import { NextFunction, Request, Response } from "express";

class errorHandler extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}
export default errorHandler;
export const errorMiddleware = (
  err: errorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode ||= 500;
  err.message ||= "INTERNAL server error";
  try {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  } catch (error) {
    console.log(error);
  }
};
