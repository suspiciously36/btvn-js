import React, { useEffect } from "react";
import Products from "./components/Products/Products";
import Header from "./pages/Header/Header";
import "./assets/index.css";
import BasicPagination from "./components/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { paginateSlice } from "./redux/slice/paginateSlice";
import Layout from "./core/Layout";

const { query } = paginateSlice.actions;

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (location.pathname.includes("product")) {
      dispatch(
        query(location.pathname.slice(location.pathname.lastIndexOf("/") + 1))
      );
    }
  }, [location.pathname]);
  return (
    <div className="center2">
      <Header />
      <Layout />
      <div className="pagination">
        <BasicPagination />
      </div>
    </div>
  );
};

export default App;
