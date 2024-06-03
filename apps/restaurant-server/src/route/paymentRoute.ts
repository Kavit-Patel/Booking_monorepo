import express from "express";
import { paymentIntent } from "../controller/paymentController";

const paymentRouter = express.Router();

paymentRouter.get("/generatePaymentIntent/:userId/:orderId", paymentIntent);

export default paymentRouter;
