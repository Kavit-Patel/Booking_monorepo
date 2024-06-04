import mongoose from "mongoose";

interface Ipayment {
  _id?: string;
  user: mongoose.Types.ObjectId;
  order: mongoose.Types.ObjectId;
  amount: number;
  payMod: string;
  paymentIntent: string;
}

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  amount: { type: Number, required: true },
  payMode: { type: String },
  paymentIntent: { type: String, required: true },
});
export const paymentModel = mongoose.model<Ipayment>("Payment", paymentSchema);
