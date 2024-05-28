import mongoose from "mongoose";
export interface Ireviw {
  id?: string;
  item: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  message: string;
}

const reviewSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String },
});

export const reviewModel = mongoose.model<Ireviw>("Review", reviewSchema);
