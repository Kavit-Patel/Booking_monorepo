import { NextFunction, Request, Response } from "express";
import errorHandler from "../utility/errorHandler";
import { Icart, cartModel } from "../model/cartModel";
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
// export const getCart = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Cart Fetching Failed !" });
//   }
// };

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
