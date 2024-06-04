import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addNewAddress, updateAddress } from "../store/address/addressApi";

const AddressForm = ({
  goBack,
  editAddress,
}: {
  goBack: (arg: boolean) => void;
  editAddress: { status: boolean; id: string | null };
}) => {
  const user = useSelector((state: RootState) => state.user);
  const address = useSelector((state: RootState) => state.address);

  const dispatch = useDispatch<AppDispatch>();
  const [addresDetail, setAddressDetail] = useState<{
    name: string;
    society: string;
    houseNumber: string;
    city: string;
    state: string;
    pincode: string;
    mobile: string;
  }>({
    name: "",
    society: "",
    houseNumber: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
  });
  useEffect(() => {
    if (editAddress.status && editAddress.id) {
      const editableAddress = address.addresses.find(
        (el) => el._id === editAddress.id
      );
      if (editableAddress) {
        setAddressDetail({
          name: editableAddress.name,
          society: editableAddress.society,
          houseNumber: editableAddress.houseNumber,
          city: editableAddress.city,
          state: editableAddress.state,
          pincode: editableAddress.pincode,
          mobile: editableAddress.mobile,
        });
      }
    }
  }, [address.addresses, editAddress.id, editAddress.status]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.user) {
      if (editAddress.status && editAddress.id) {
        await dispatch(
          updateAddress({
            dataObj: addresDetail,
            userId: user.user._id,
            addressId: editAddress.id,
          })
        );
      } else {
        await dispatch(
          addNewAddress({ dataObj: addresDetail, userId: user.user._id })
        );
      }
      goBack(false);
    }
    setAddressDetail({
      name: "",
      society: "",
      houseNumber: "",
      city: "",
      state: "",
      pincode: "",
      mobile: "",
    });
  };
  return (
    <div className="w-full  h-[36rem]  bg-[#e9e8e3] flex flex-col gap-1 justify-center  ">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full h-full flex flex-col items-center gap-4 "
      >
        <h2 className="w-full flex justify-center text-xl md:text-2xl py-4 ">
          <p className="border-b-2 border-black w-fit pb-1">Add New Address</p>
        </h2>
        <div className="w-full px-2 md:px-0 md:w-[70%] flex flex-col gap-2 text-lg">
          <label htmlFor="name px-2">Name</label>
          <input
            value={addresDetail.name}
            onChange={(e) => handleChange(e)}
            className="px-2 py-1 rounded-md"
            name="name"
            type="text"
            placeholder="Name..."
          />
        </div>
        <div className="w-full px-2 md:px-0 md:w-[70%] flex  gap-2 text-lg">
          <div className="flex-1 flex flex-col">
            <label htmlFor="name px-2">Society</label>
            <input
              value={addresDetail.society}
              onChange={(e) => handleChange(e)}
              className="px-2 py-1 rounded-md"
              name="society"
              type="text"
              placeholder="Society ..."
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="name px-2">House No.</label>
            <input
              value={addresDetail.houseNumber}
              onChange={(e) => handleChange(e)}
              className="px-2 py-1 rounded-md"
              name="houseNumber"
              type="text"
              placeholder="House No ..."
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="name px-2">City</label>
            <input
              value={addresDetail.city}
              onChange={(e) => handleChange(e)}
              className="px-2 py-1 rounded-md"
              name="city"
              type="text"
              placeholder="City ..."
            />
          </div>
        </div>
        <div className="w-full px-2 md:px-0 md:w-[70%] flex  gap-2 text-lg">
          <div className="flex-1 flex flex-col">
            <label htmlFor="name px-2">State</label>
            <input
              value={addresDetail.state}
              onChange={(e) => handleChange(e)}
              className="px-2 py-1 rounded-md"
              name="state"
              type="text"
              placeholder="State ..."
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="name px-2">Pincode</label>
            <input
              value={addresDetail.pincode}
              onChange={(e) => handleChange(e)}
              className="px-2 py-1 rounded-md"
              name="pincode"
              type="text"
              placeholder="Pincode No ..."
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label htmlFor="name px-2">Mobile</label>
            <input
              value={addresDetail.mobile}
              onChange={(e) => handleChange(e)}
              className="px-2 py-1 rounded-md"
              name="mobile"
              type="text"
              placeholder="Mobile No ..."
            />
          </div>
        </div>
        <input
          onChange={(e) => handleChange(e)}
          className="bg-orange-300 px-6 py-2 mt-6 text-lg rounded-sm cursor-pointer transition-all hover:scale-105 hover:font-semibold active:scale-95"
          type="submit"
          value={editAddress.status ? "Update" : "Add"}
        />
      </form>
      <button
        onClick={() => goBack(false)}
        className="bg-gray-500 px-3 py-2 text-white w-fit self-center mb-24  rounded-md transition-all hover:scale-110 active:scale-95 "
      >
        Back
      </button>
    </div>
  );
};

export default AddressForm;
