import React, { useState } from "react";
import { useDispatch, useSelector } from "../core/hook";
import { getApiKey } from "../configs/dataGetter";
import { errorNotif, successNotif } from "../toaster/Toastify";
import { ToastContainer } from "react-toastify";
import Loading from "../components/Loading";

export default function LoginPage() {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailInput = (email) => {
    setEmail(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailRegex.test(email)) {
      dispatch({
        type: "loading/show",
      });
      getApiKey(email);
      dispatch({
        type: "login/logged",
      });
    } else {
      errorNotif("Error! Invalid Email.");
    }
  };
  return (
    <div className="login-form">
      <h1>Welcome to Shopoo</h1>
      <h2>Please enter email to login!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter Email..."
          id="email"
          onChange={(e) => {
            emailInput(e.target.value);
          }}
          value={email}
        />
        <button className="login-btn">Login</button>
      </form>
      <ToastContainer />
      <Loading isLoading={isLoading} />
    </div>
  );
}
