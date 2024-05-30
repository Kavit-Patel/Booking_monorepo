import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { addItem } from "../store/item/itemApi";

const AddItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [img, setImg] = useState<File | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [itemDetail, setItemDetail] = useState<{
    title: string;
    stock: number;
    price: number;
  }>({ title: "", stock: 0, price: 0 });
  const handleItemDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemDetail((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleImage = async () => {
    if (img) {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "preset_test");

      try {
        const cloud_name = import.meta.env.VITE_CLOUDINARY_NAME;
        const resource_type = "image";
        const api = `https://api.cloudinary.com/v1_1/${cloud_name}/${resource_type}/upload`;

        const req = await fetch(api, { method: "POST", body: data });
        const res = await req.json();
        return res.secure_url;
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const image = await handleImage();
    await dispatch(addItem({ ...itemDetail, image }));
    setLoader(false);
    navigate("/menu");
  };

  return (
    <div className="w-full h-[calc(100vh-36px)] bg-[#DFDFDF] flex justify-center">
      <div className="w-[375px] md:w-[800px] lg:w-[1000px] bg-[#f5f5f5] flex justify-center items-center">
        <section className="w-full h-full  py-5 flex justify-center items-center">
          <form
            onSubmit={(e) => handleSubmit(e)}
            action=""
            className="border-2 p-6 w-full md:w-[80%] lg:w-[65%]  flex flex-col gap-2 shadow-xl"
          >
            <div className="text-center mb-4 text-xl font-semibold border-b-2 border-black w-fit pb-1 self-center">
              Add New Item
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-8 justify-between">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="title">title</label>
                <input
                  onChange={(e) => handleItemDetail(e)}
                  className="p-2 rounded-md outline-none border border-[#EEEEF4]"
                  name="title"
                  type="text"
                  placeholder="Hamburger..."
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="stock">Stock</label>
                <input
                  onChange={(e) => handleItemDetail(e)}
                  className="p-2 rounded-md outline-none border border-[#EEEEF4]"
                  name="stock"
                  type="number"
                  placeholder="20"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="price">price</label>
              <input
                onChange={(e) => handleItemDetail(e)}
                className="p-2 rounded-md outline-none border border-[#EEEEF4]"
                name="price"
                type="number"
                placeholder="149"
              />
            </div>

            <div className="flex flex-col my-3 gap-2">
              <label htmlFor="img">Choose Item Image</label>
              <input
                className="bg-white py-3 px-2"
                type="file"
                onChange={(e) => e.target.files && setImg(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className={`bg-[#D8DDE2] transition-all ${
                loader ? "animate-pulse" : ""
              } active:scale-95 hover:bg-[#B6BCC2] hover:font-semibold cursor-pointer
              
           p-2.5 rounded-md`}
            >
              Add
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddItem;
