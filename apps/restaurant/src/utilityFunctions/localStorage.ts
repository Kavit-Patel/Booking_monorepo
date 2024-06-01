import { IItem } from "../store/item/itemSlice";

export interface IlocalStorage {
  _id?: string;
  item: IItem;
  user: string;
  quantity: number;
}
export const currentLs = () => {
  const lsCart = localStorage.getItem("restaurantCart");
  if (lsCart === null) {
    // localStorage.setItem("restaurantCart", JSON.stringify([]));
    return [];
  } else {
    return JSON.parse(lsCart);
  }
};
export const findItemInLs = (itemId: string) => {
  return currentLs().find((item: IlocalStorage) => item.item._id === itemId);
};
export const LsCartOperation = (
  item: IItem,
  operation: string,
  stock: number,
  userId: string,
  quantity?: number
) => {
  const ls: IlocalStorage[] | [] = currentLs();
  let updatedLs: IlocalStorage[];
  const matchItem: IlocalStorage = findItemInLs(item._id);
  if (matchItem) {
    if (operation === "remove") {
      const index = ls.findIndex((el) => el.item._id === matchItem.item._id);
      if (index !== -1) {
        ls.splice(index, 1);
      }
      updatedLs = ls;
    } else {
      updatedLs = ls.map((lsItem) =>
        lsItem.item._id === matchItem.item._id
          ? {
              ...lsItem,
              quantity:
                operation === "addition"
                  ? lsItem.quantity < stock
                    ? lsItem.quantity + 1
                    : lsItem.quantity
                  : operation === "subtraction"
                    ? lsItem.quantity > 1
                      ? lsItem.quantity - 1
                      : lsItem.quantity
                    : lsItem.quantity,
            }
          : lsItem
      );
    }
  } else {
    updatedLs = [
      ...ls,
      {
        _id: Math.floor(Math.random() * 100000000000000).toString(),
        item,
        user: userId,
        quantity: quantity ?? 1,
      },
    ];
  }
  localStorage.setItem("restaurantCart", JSON.stringify(updatedLs));
  return currentLs();
};
