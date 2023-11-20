import React from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

const App = () => {
  return (
    <main className="">
      <h1>Auth0 Login</h1>
      <LoginButton />
      <LogoutButton />
    </main>
  );
};

export default App;
