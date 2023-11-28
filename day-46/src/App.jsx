import React from "react";
import Products from "./components/Products/Products";
import Header from "./pages/Header/Header";
import "./assets/index.css";
import PaginationLink from "./components/Pagination/Pagination";

const App = () => {
  return (
    <div className="center2">
      <Header />
      <Products />
      <div className="pagination">
        <PaginationLink />
      </div>
    </div>
  );
};

export default App;
