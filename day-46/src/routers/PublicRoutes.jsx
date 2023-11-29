import React from "react";
import Products from "../components/Products/Products";
import Cart from "../pages/Cart/Cart";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import { Route } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<Products />}>
        <Route path="/products/:page" element={<Products />} />
        <Route path="/details/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </>
  );
};

export default PublicRoutes;
