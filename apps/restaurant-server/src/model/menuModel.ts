import mongoose from "mongoose";

export interface Imenu {
  _id?: string;
  title: string;
  image: string;
  stock: number;
  price: number;
  likes: [mongoose.Types.ObjectId];
  disLikes: [mongoose.Types.ObjectId];
}

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  disLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
export const menuModel = mongoose.model<Imenu>("Menu", menuSchema);
