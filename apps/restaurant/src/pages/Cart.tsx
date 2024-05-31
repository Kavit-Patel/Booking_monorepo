import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import Loader from "../component/Loader";
import { getCart } from "../store/cart/cartApi";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchItems = async () => {
      if (user.user) {
        await dispatch(getCart(user.user._id));
      }
    };
    fetchItems();
  }, [dispatch, user.user]);
  return (
    <div className="w-full h-full flex flex-col gap-4 p-8 overflow-y-auto">
      <div className="text-xl md:text-2xl w-full flex justify-center">
        <h2 className="border-b-2 border-[#F1D5BB] w-fit pb-1 px-2">Cart</h2>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {cart.cart.length !== 0 ? (
          cart.cartFetchedStatus === "pending" ? (
            <Loader />
          ) : (
            <div className="w-full flex gap-3">
              <div className="w-full px-3 md:w-[55%] min-h-72 bg-[#F1D5BB]">
                {cart.cart.map((item) => (
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
                      <FaMinus />
                      <span className=" bg-white py-1 px-2 rounded-sm text-sm">
                        1
                      </span>
                      <FaPlus />
                    </div>
                    <div className="w-12 text-red-700">
                      <RxCross1 />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full px-3 md:w-[45%] min-h-72 bg-[#F1D5BB]"></div>
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
