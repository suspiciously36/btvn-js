import React from "react";
import "../assets/css/style.css";
import ProductList from "../components/ProductList";
import EmptyCart from "../components/EmptyCart";
import ProductCart from "../components/ProductCart";
import { useEffect } from "react";
import { client } from "../configs/client";
import Loading from "../components/Loading";
import { useSelector, useDispatch } from "../core/hook";

export default function HomePage() {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("apiKey")) {
      client.setToken(localStorage.getItem("apiKey"));
    }
    if (JSON.parse(localStorage.getItem("cart"))) {
      dispatch({
        type: "cart/add",
        payload: JSON.parse(localStorage.getItem("cart")),
      });
    }
  }, []);
  return (
    <div className="container">
      <div className="shop">
        <h1>Welcome to Shopoo</h1>
        <ProductList />
        {localStorage.getItem("cart") ? <ProductCart /> : <EmptyCart />}
        <Loading isLoading={isLoading} />
      </div>
    </div>
  );
}
