import React from "react";
import Image from "next/image";
import "./loginInfo.css";
import Link from "next/link";
import { getProviders } from "next-auth/react";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
  pagetype: string;
};

export default function LoginInfo({ user, pagetype }: Props) {
  const userName = user?.name ? <h4>{user?.name}</h4> : null;
  const userImage = user?.image ? (
    <Image
      className="user-image-3"
      src={user?.image}
      width={25}
      height={25}
      alt="userimg"
    />
  ) : null;

  return (
    <div className="container">
      <div className="button-container">
        <button className="login-info-github-btn">
          {/* <Link href="/api/auth/callback/github"> */}
          <div>{userImage}</div>{" "}
          <div>
            <i>{userName}</i>
          </div>
          {/* </Link> */}
        </button>
        <button className="login-info-google-btn">
          {/* <Link href={`/api/auth/callback/google`}> */}
          <div>{userImage}</div>{" "}
          <div>
            <i>{userName}</i>
          </div>
          {/* </Link> */}
        </button>
      </div>
      <button className="logout-btn">
        <Link href="/api/auth/signout">Log out</Link>
      </button>
    </div>
  );
}
