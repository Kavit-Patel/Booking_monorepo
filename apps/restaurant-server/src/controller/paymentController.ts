import { NextFunction, Request, Response, response } from "express";
import errorHandler from "../utility/errorHandler";
import { instance } from "../index";
import { paymentModel } from "../model/paymentModel";
import crypto from "crypto";
import { orderModel } from "../model/orderModel";

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
    const newPayment = await paymentModel.create({
      user: userId,
      order: orderId,
      amount,
      paymentIntent: intent.id,
    });
    //adding paymentIntent id to respected order

    await orderModel.findByIdAndUpdate(orderId, {
      $set: { "payment.payId": newPayment._id },
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

export const pay = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body.toString())
      .digest("hex");
    const isAuthenticate = expectedSignature === razorpay_signature;
    if (isAuthenticate) {
      const paymentInstance = await paymentModel.findOne({
        paymentIntent: razorpay_order_id,
      });

      if (paymentInstance) {
        await orderModel.findByIdAndUpdate(paymentInstance.order, {
          $set: { "payment.payStatus": "Done" },
        });
      }
    }
    return res.redirect(`${process.env.PAYMENT_SUCCESS_REDIRECT}/myOrders`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Payment Varification Failed !",
    });
  }
};
