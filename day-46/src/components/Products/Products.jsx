import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { counterSlice } from "../../redux/slice/counterSlice";

import { numberWithCommas } from "../../utilities/commaSeperator";

import {
  getPosts,
  getTotalPages,
} from "../../redux/middlewares/postMiddleware";
import "./products.css";

const { add } = counterSlice.actions;
const Products = () => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.counter.postList);
  const status = useSelector((state) => state.counter.status);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getTotalPages());
  }, []);

  if (status === "error") {
    return <h3>Đã có lỗi xảy ra</h3>;
  }
  return (
    <div className="container">
      <h1 className="center title">PRODUCTS</h1>
      {status !== "idle" &&
        (status === "pending" ? (
          <h3>Loading...</h3>
        ) : (
          postList.map(({ _id, name, price, image }) => {
            return (
              <div key={_id} className="product-container">
                <div className="product">
                  <div className="image center">
                    <img src={image} alt="" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title center">{name}</h3>
                    <div className="product-price">
                      <span>$</span>
                      {numberWithCommas(price)}
                    </div>
                    <div className="add-to-cart">
                      <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ))}
    </div>
  );
};

export default Products;
