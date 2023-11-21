import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <article className="">
        <div className="container">
          {user?.picture && (
            <img className="avt" src={user.picture} alt={user?.name} />
          )}
          <h1 className="text-center">Xin chào bạn {user?.name}</h1>
          <h3 className="text-center">Email</h3>
          <input type="email" value={`examle@gmail.com`} />
          <h3 className="text-center">Message</h3>
          <input type="text" value={`Chúc mừng sinh nhật Quân && Dương nhé!`} />
          <button>Send Message</button>
          <LogoutButton />
        </div>
      </article>
    )
  );
};

export default Profile;
