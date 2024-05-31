import mongoose from "mongoose";

export interface Iuser {
  _id?: string;
  name: string;
  isAdmin: boolean;
  email: string;
  password: string;
  image: string;
  liked: [mongoose.Types.ObjectId];
  disLiked: [mongoose.Types.ObjectId];
  reviews: [mongoose.Types.ObjectId];
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  disLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

export const userModel = mongoose.model<Iuser>("User", userSchema);
