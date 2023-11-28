import React from "react";
import "./header.css";
const Header = () => {
  return (
    <header className="header">
      <div className="icon">
        <img
          src="https://code-fullstack-exercise46.vercel.app/assets/favicon-98cdf457.ico"
          alt=""
        />
      </div>
      <div className="cart">
        <i className="fa-solid fa-cart-shopping"></i>
        <div id="number-of-products">0</div>
      </div>
    </header>
  );
};

export default Header;
