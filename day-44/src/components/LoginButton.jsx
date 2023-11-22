import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <button
        className="sign-in"
        onClick={() => {
          loginWithPopup();
        }}
      >
        ĐĂNG NHẬP || ĐĂNG KÝ
      </button>
    )
  );
};

export default LoginButton;
