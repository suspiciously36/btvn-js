import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../core/hook";
import { getProducts, getUsersProfile } from "../configs/dataGetter";
import { successNotif } from "../toaster/Toastify";

export default function ProductList() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      //   dispatch({
      //     type: "loading/show",
      //   });
      getProducts();
      getUsersProfile();
      setProductList(getProducts().data.listProduct);
    }
    fetchData();
  }, []);
  return <div></div>;
}
