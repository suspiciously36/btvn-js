import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <button
        className="sign-in"
        onClick={() => {
          loginWithRedirect();
        }}
      >
        ĐĂNG NHẬP || ĐĂNG KÝ
      </button>
    )
  );
};

export default LoginButton;
