import express from "express";
import { pay, paymentIntent } from "../controller/paymentController";

const paymentRouter = express.Router();

paymentRouter.post("/generatePaymentIntent/:userId/:orderId", paymentIntent);
paymentRouter.post("/pay", pay);

export default paymentRouter;
