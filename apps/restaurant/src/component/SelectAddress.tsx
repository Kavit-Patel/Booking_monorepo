import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import AddressForm from "./AddressForm";
import { fetchAddresses } from "../store/address/addressApi";
import { generateOrder } from "../store/order/orderApi";
import { useNavigate } from "react-router-dom";

const SelectAddress = ({ back }: { back: (arg: boolean) => void }) => {
  const navigate = useNavigate();
  const address = useSelector((state: RootState) => state.address);
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();
  const [addForm, setAddForm] = useState<boolean>(false);
  const [addressSelected, setAddressSelected] = useState<string | null>(null);
  const [editAddress, setEditAddress] = useState<{
    status: boolean;
    id: string | null;
  }>({ status: false, id: null });
  const comeBack = (status: boolean) => {
    setAddForm(status);
    setEditAddress({ status, id: null });
    setAddressSelected(null);
  };
  useEffect(() => {
    const fetchAdd = async () => {
      if (user.user) {
        await dispatch(fetchAddresses(user.user._id));
      }
    };
    fetchAdd();
  }, [dispatch, user.user]);
  const createOrder = async () => {
    const cartIds = cart.cart.map((product) => {
      return product._id;
    });
    const products = cart.cart.map((product) => {
      return {
        product: product.item._id,
        quantity: product.quantity,
        price: product.item.price,
      };
    });
    const tax: number = 112;
    const shipping: number = 40;
    const subtotal: number = cart.cart.reduce(
      (acc, el) => acc + el.quantity * el.item.price,
      0
    );
    const total: number = subtotal + shipping + tax;
    if (addressSelected && user.user) {
      await dispatch(
        generateOrder({
          dataObj: {
            cartIds,
            products,
            address: addressSelected,
            tax,
            shipping,
            subtotal,
            total,
          },
          userId: user.user._id,
        })
      );
      navigate("/order");
    }
  };
  return (
    <div className="w-full  h-[36rem] bg-[#e9e8e3] flex flex-col items-center ">
      <p className="py-2">Select Address :</p>
      {address.addresses.length === 0 ? (
        <div className="w-full h-72 p-4 md:p-12 flex flex-col gap-4 justify-center items-center">
          <h2>No Addresses !</h2>
          <p
            onClick={() => setAddForm(true)}
            className="text-blue-700 cursor-pointer"
          >
            Add new Address !
          </p>
        </div>
      ) : (
        <div className="w-full h-96 flex flex-col items-center justify-center gap-3 overflow-y-auto p-2 ">
          {address.addresses.map((el) => (
            <div
              key={el._id}
              className="w-[95%] flex items-center gap-5 bg-[#fcf9f1] p-2 rounded-md"
            >
              <input
                onChange={() => setAddressSelected(el._id)}
                checked={addressSelected === el._id}
                type="radio"
                name=""
                id=""
              />
              <div className="w-[85%]  ">
                <p>{el.name}</p>
                <span className="px-2">{el.society}</span>
                {" ; "}
                <span className="px-2">{el.houseNumber}</span>
                {" ; "}
                <span className="px-2">{el.city}</span>
                {" ; "}
                <span className="px-2">{el.state}</span>
                {" ; "}
                <span className="px-2">{el.pincode}</span>
                {" ; "}
                <span className="px-2">{el.mobile}</span>
              </div>
              <button
                onClick={() => setEditAddress({ status: true, id: el._id })}
                className="text-lg cursor-pointer md:text-xl transition-all hover:scale-105 active:scale-95"
              >
                <MdEdit />
              </button>
              <button
                onClick={() => setEditAddress({ status: true, id: el._id })}
                className=" text-red-500 text-lg cursor-pointer md:text-xl transition-all hover:scale-105 active:scale-95"
              >
                <MdDelete />
              </button>
            </div>
          ))}
          <p
            onClick={() => setAddForm(true)}
            className="text-blue-700 cursor-pointer mt-auto"
          >
            Add new Address !
          </p>
        </div>
      )}
      <div className="w-[90%] flex justify-between">
        <button
          onClick={() => back(false)}
          className="bg-gray-500 px-3 py-2 text-white rounded-md transition-all hover:scale-110 active:scale-95 "
        >
          Back
        </button>
        <button
          onClick={() => createOrder()}
          disabled={!addressSelected ? true : false}
          className={`bg-orange-300 text-black px-3 py-2 rounded-md ${addressSelected ? "transition-all hover:scale-110 hover:font-semibold  active:scale-95" : ""}`}
        >
          Next
        </button>
      </div>

      {addForm ||
        (editAddress.status && (
          <div className="absolute top-0">
            <AddressForm
              goBack={(arg: boolean) => comeBack(arg)}
              editAddress={editAddress}
            />
          </div>
        ))}
    </div>
  );
};

export default SelectAddress;
