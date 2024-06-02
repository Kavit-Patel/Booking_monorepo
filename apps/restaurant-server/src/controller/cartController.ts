import { NextFunction, Request, Response } from "express";
import errorHandler from "../utility/errorHandler";
import { cartModel } from "../model/cartModel";

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;
    if (!userId || !itemId || !quantity)
      return next(
        new errorHandler(403, "Provide all details to add to cart !")
      );
    const newCartItem = await cartModel.create({
      item: itemId,
      user: userId,
      quantity,
    });
    if (!newCartItem)
      return next(new errorHandler(500, "Item doesn't added to cart !"));
    return res.status(201).json({
      success: true,
      message: "Item Added to Cart !",
      response: newCartItem,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Cart Addition Fail !" });
  }
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    if (!userId) return next(new errorHandler(403, "Provide UserId !"));
    const cart = await cartModel.find({ user: userId }).populate("item");
    return res.status(200).json({
      success: true,
      message:
        cart.length === 0
          ? "Cart Fetched successfully ! but Empty !"
          : "Cart Fetched Successfully !",
      response: cart,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Cart Fetching Failed !" });
  }
};
export const syncLsDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lsData = req.body;
    const { userId } = req.params;
    const isValidLsData = (arr: any) => {
      return arr.every(
        (el: any) =>
          typeof el.item._id === "string" &&
          typeof el.user === "string" &&
          typeof el.quantity === "number"
      );
    };
    if (!isValidLsData(lsData) || !userId)
      return next(
        new errorHandler(403, "Provide Valid LocalStorage Cart and/or userId !")
      );
    const userLsData = lsData.filter(
      (data: any) => data.user === userId || data.user === "guest"
    );
    const cart = await cartModel.find({ user: userId });

    const updatedCartPromise = cart.map(async (item) => {
      const matched = userLsData.find((el: any) => {
        return el.item._id === item.item.toString();
      });
      if (matched) {
        // const objectIdItemId = new mongoose.Types.ObjectId(matched.item._id);
        await cartModel.findOneAndUpdate(
          { item: matched.item._id },
          { $set: { quantity: matched.quantity } }
        );
        return { ...item, quantity: matched.quantity };
      } else {
        return item;
      }
    });
    const newItemsPromise = userLsData.map(async (item: any) => {
      const matched = cart.find((el) => el.item.toString() === item.item._id);
      if (!matched || cart.length === 0) {
        const newItem = {
          item: item.item._id,
          user: userId,
          quantity: item.quantity,
        };
        await cartModel.create(newItem);
        return newItem;
      } else {
        return item;
      }
    });
    const combinePromises = [...updatedCartPromise, ...newItemsPromise];
    await Promise.all(combinePromises);

    const latestCart = await cartModel.find({ user: userId }).populate("item");
    return res.status(200).json({
      success: true,
      message: "Cart Synced Successfully !",
      response: latestCart,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Cart Syncing Failed !" });
  }
};

export const removeItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, itemId } = req.params;
    if (!userId || !itemId)
      return next(new errorHandler(403, "Provide all details !"));
    const removed = await cartModel.findOneAndDelete({
      user: userId,
      item: itemId,
    });
    if (!removed) return next(new errorHandler(500, "Item Removal Failed !"));
    const latestCart = await cartModel.find({ user: userId }).populate("item");
    return res.status(200).json({
      success: true,
      message:
        latestCart.length === 0
          ? "Your Cart Is Empty !"
          : "Item Removed Successfully !",
      response: latestCart,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Item Removal Failed !" });
  }
};
