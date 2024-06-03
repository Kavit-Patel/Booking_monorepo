import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { logOut } from "../store/user/userApi";

const Profile = ({ isAdmin }: { isAdmin: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogOut = async () => {
    await dispatch(logOut());
  };

  return (
    <div className=" min-w-36 h-full bg-[#e9e8e3] rounded-md p-4 flex flex-col gap-3 text-sm ">
      {isAdmin && (
        <Link to="/addItem" className="">
          Add New Item
        </Link>
      )}
      <Link to="/addItem">Profile</Link>
      <Link to="/myOrders">Orders</Link>
      <div onClick={() => handleLogOut()} className="">
        LogOut
      </div>
    </div>
  );
};

export default Profile;
