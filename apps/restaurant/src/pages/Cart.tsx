import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import Loader from "../component/Loader";
import { removeItem, syncLsDb } from "../store/cart/cartApi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { LsCartOperation, currentLs } from "../utilityFunctions/localStorage";
import { getLsCart } from "../store/cart/cartSlice";
import { IItem } from "../store/item/itemSlice";
import SelectAddress from "../component/SelectAddress";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user);
  const address = useSelector((state: RootState) => state.address);
  const syncRef = useRef<boolean>(false);
  const [selectAddress, setSelectAddress] = useState<boolean>(false);

  useEffect(() => {
    const syncingWithDb = async () => {
      if (user.user) {
        syncRef.current = true;
        await dispatch(
          syncLsDb({ dataObj: cart.lsCart, userId: user.user._id })
        );
      }
    };
    if (!syncRef.current) {
      syncingWithDb();
    }
  }, [dispatch, user.user, cart.lsCart]);

  useEffect(() => {
    if (cart.cartSyncedStatus === "success") {
      localStorage.setItem("restaurantCart", JSON.stringify(cart.lsCart));
    }
  }, [cart.cartSyncedStatus, cart.lsCart]);
  useEffect(() => {
    const ls = currentLs();
    dispatch(getLsCart(ls));
  }, [dispatch, cart.cartSyncedStatus]);
  const cartOperation = async (
    operation: string,
    item: IItem,
    stock: number,
    quantity: number
  ) => {
    if (operation !== "remove") {
      const changedLsItems = LsCartOperation(
        item,
        operation,
        stock,
        user.user?._id ? user.user._id : "guest",
        quantity
      );
      dispatch(getLsCart(changedLsItems));
    } else {
      if (user.user) {
        await dispatch(removeItem({ userId: user.user._id, itemId: item._id }));
      } else {
        alert("You need to logIn first, To remove cart-item !");
      }
    }
  };
  const backButton = (status: boolean) => {
    setSelectAddress(status);
  };
  const handleOrder = () => {
    if (!user.user) {
      alert("You need to login before further action !");
      navigate("/login");
      return;
    }
    if (!address.selectedAddress) {
      setSelectAddress(true);
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-4 p-8 overflow-y-auto">
      <div className="text-xl md:text-2xl w-full flex justify-center">
        <h2 className="border-b-2 border-[#F1D5BB] w-fit pb-1 px-2">Cart</h2>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {cart.lsCart.length !== 0 ? (
          cart.cartFetchedStatus === "pending" ? (
            <Loader />
          ) : (
            <div className="w-full flex justify-center gap-3">
              <div className="w-full px-3 md:w-[50%] min-h-72 bg-[#F1D5BB]">
                {cart.lsCart.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 flex justify-between items-center gap-3"
                  >
                    <img
                      className="w-12 h-12 rounded-full "
                      src={item.item.image}
                      alt=""
                    />
                    <div className=" w-40 text-sm flex flex-col">
                      <h2 className="font-semibold">{item.item.title}</h2>
                      <p>${item.item.price}</p>
                    </div>
                    <div className="w-40 flex items-center text-xs gap-3">
                      <FaMinus
                        onClick={() =>
                          cartOperation(
                            "subtraction",
                            item.item,
                            item.item.stock,
                            item.quantity
                          )
                        }
                      />
                      <span className=" bg-white py-1 px-2 rounded-sm text-sm">
                        {item.quantity}
                      </span>
                      <FaPlus
                        onClick={() =>
                          cartOperation(
                            "addition",
                            item.item,
                            item.item.stock,
                            item.quantity
                          )
                        }
                      />
                    </div>
                    <div className="w-12 text-red-700">
                      <RxCross1
                        onClick={() =>
                          cartOperation(
                            "remove",
                            item.item,
                            item.item.stock,
                            item.quantity
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full px-4 py-8 md:w-[35%] min-h-72 bg-[#F1D5BB] flex flex-col items-center gap-3 ">
                <h2 className="text-xl md:text-2xl">Your Subtotal</h2>
                <div className="flex gap-4">
                  <span>Subtotal</span>
                  <span>
                    $
                    {cart.lsCart.reduce(
                      (acc, el) => acc + el.quantity * el.item.price,
                      0
                    )}
                  </span>
                </div>
                <div
                  onClick={() => handleOrder()}
                  className="px-4 py-2 bg-black text-white cursor-pointer mt-auto transition-all hover:scale-105 active:scale-95"
                >
                  Confirm Order
                </div>
              </div>
              {selectAddress && (
                <div className="w-full h-full absolute top-12 px-8">
                  <SelectAddress back={(arg: boolean) => backButton(arg)} />
                </div>
              )}
            </div>
          )
        ) : (
          <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
            <h2>Your Cart is Empty !</h2>
            <Link to="/menu" className="text-blue-700">
              Add Items To Cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
