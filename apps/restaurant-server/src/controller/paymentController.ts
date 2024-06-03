import { NextFunction, Request, Response, response } from "express";
import errorHandler from "../utility/errorHandler";
import { instance } from "../index";
import { paymentModel } from "../model/paymentModel";
// export const paymentIntent = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//   } catch (error) {
//     return res
//       .status(500)
//       .json({
//         success: false,
//         message:
//           error instanceof Error
//             ? error.message
//             : "PaymentIntent Generation Failed !",
//       });
//   }
// };

export const paymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, orderId } = req.params;
    const { amount } = req.body;
    if (!amount || !userId || !orderId)
      return next(new errorHandler(403, "Provide Amout !"));
    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
    };
    const intent = await instance.orders.create(options);
    if (!intent)
      return next(new errorHandler(500, "Payment Intent generatin failed !"));
    console.log(intent);
    const newPayment = await paymentModel.create({
      user: userId,
      order: orderId,
      amount,
      paymentIntent: intent,
    });
    return res.status(201).json({
      success: true,
      message: "PaymentIntent Generated Successfully !",
      response: newPayment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "PaymentIntent Generation Failed !",
    });
  }
};
