import React from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import "./assets/css/style.css";

const App = () => {
  const { isLoading, error } = useAuth0();

  return (
    <main className="main">
      <div className="container">
        <h1>Cảm ơn bạn đã sử dụng dịch vụ của F8</h1>
        <p>
          Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi
          tại đây!
        </p>
        <LoginButton />
      </div>

      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LogoutButton />
          <Profile />
        </>
      )}
    </main>
  );
};

export default App;
