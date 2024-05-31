export interface IlocalStorage {
  itemId: string;
  userId: string;
  quantity: number;
}
export const currentLs = () => {
  const lsCart = localStorage.getItem("restaurantCart");
  if (lsCart === null) {
    localStorage.setItem("restaurantCart", JSON.stringify([]));
    return [];
  } else {
    return JSON.parse(lsCart);
  }
};
export const findItemInLs = (itemId: string) => {
  return currentLs().find((item: IlocalStorage) => item.itemId === itemId);
};
export const LsCartOperation = (
  itemId: string,
  operation: string,
  stock: number,
  userId?: string,
  quantity?: number
) => {
  const ls: IlocalStorage[] | [] = currentLs();
  let updatedLs: IlocalStorage[];
  const item: IlocalStorage = findItemInLs(itemId);
  if (item) {
    updatedLs = ls.map((lsItem) =>
      lsItem.itemId === item.itemId
        ? {
            ...lsItem,
            quantity:
              operation === "addition"
                ? lsItem.quantity < stock
                  ? lsItem.quantity + 1
                  : lsItem.quantity
                : lsItem.quantity > 1
                  ? lsItem.quantity - 1
                  : lsItem.quantity,
          }
        : lsItem
    );
  } else {
    updatedLs = [
      ...ls,
      { itemId, userId: userId ?? "guest", quantity: quantity ?? 1 },
    ];
  }
  localStorage.setItem("restaurantCart", JSON.stringify(updatedLs));
  return currentLs();
};
