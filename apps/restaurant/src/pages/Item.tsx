import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { fetchItem } from "../store/item/itemApi";

const Item = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  useEffect(() => {
    const getItem = async () => {
      if (id) {
        await dispatch(fetchItem(id));
      }
    };
    getItem();
  }, [dispatch, id]);
  return <div></div>;
};

export default Item;
