import mongoose from "mongoose";
export interface Iproducts {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}
export interface Iorder {
  _id: string;
  user: mongoose.Types.ObjectId;
  products: Iproducts[];
  address: mongoose.Types.ObjectId;
  tax: number;
  shipping: number;
  subtotal: number;
  total: number;
}

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  tax: { type: Number, required: true },
  shipping: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  total: { type: Number, required: true },
});
export const orderModel = mongoose.model<Iorder>("Order", orderSchema);
