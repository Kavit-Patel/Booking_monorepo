import mongoose from "mongoose";

export interface Icart {
  _id?: string;
  item: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  quantity: number;
}

const cartSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true },
});
export const cartModel = mongoose.model("Cart", cartSchema);
