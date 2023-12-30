import React from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Fragment } from "react";
import { useState } from "react";
import { useSelector } from "./core/hook";
import { getApiKey } from "./configs/dataGetter";

export default function App() {
  const isLogin = useSelector((state) => state.isLogin);
  return (
    <Fragment>
      {isLogin || localStorage.getItem("apiKey") ? <HomePage /> : <LoginPage />}
    </Fragment>
  );
}
