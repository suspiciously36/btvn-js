import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <div className="icon">
        <Link to={"/"}>
          <img
            src="https://code-fullstack-exercise46.vercel.app/assets/favicon-98cdf457.ico"
            alt=""
          />
        </Link>
      </div>
      <div className="cart">
        <Link to={"/cart"}>
          <i className="fa-solid fa-cart-shopping"></i>
        </Link>
        <div id="number-of-products">0</div>
      </div>
    </header>
  );
};

export default Header;
