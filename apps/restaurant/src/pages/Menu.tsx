import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { fetchItems } from "../store/item/itemApi";
import Loader from "../component/Loader";
import { addToCart } from "../store/cart/cartApi";
import { LsCartOperation } from "../utilityFunctions/localStorage";

const Menu = () => {
  const navigate = useNavigate();
  const items = useSelector((state: RootState) => state.item);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getItems = async () => {
      await dispatch(fetchItems());
    };

    if (items.items.length === 0) {
      getItems();
    }
  }, [dispatch, items.items.length]);
  const handleAddToCart = async (itemId: string, stock: number) => {
    if (user.user) {
      LsCartOperation(itemId, "addition", stock, user.user._id);
      await dispatch(addToCart({ itemId, userId: user.user._id, quantity: 1 }));
    } else {
      LsCartOperation(itemId, "addition", stock);
    }
    navigate("/cart");
  };
  return (
    <div className="w-full h-full p-4 flex flex-col gap-3 justify-center items-center">
      <h2 className="w-full  font-semibold text-center text-xl md:text-2xl ">
        SHUSHI FOOD
      </h2>
      <div className="w-full h-full flex ">
        {items.itemsFetchedStatus === "pending" ? (
          <Loader />
        ) : items.items.length > 0 ? (
          <section className=" w-full h-full flex flex-wrap justify-center gap-20  mx-2 md:mx-8">
            {items.items.map((item) => (
              <div
                onClick={() => handleAddToCart(item._id, item.stock)}
                key={item._id}
                className="transition-all hover:scale-110 cursor-pointer"
              >
                <img className=" w-56 h-72" src={item.image} alt="" />
                <p className="text-center">{item.title}</p>
              </div>
            ))}
          </section>
        ) : (
          <section className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <h2>No Items To Show !</h2>
            <Link to="/addItem" className="text-blue-700">
              Add Item if You are Admin !
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};

export default Menu;
