"use client";

import React from "react";
import "@/app/(components)/Navbar/Navbar.scss";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const isActive = (path) => {
    return path === pathname;
  };
  return (
    <div className="navbar-container">
      <div className="mindmap">
        <Link href={"/"}>Mindmap Flow</Link>
      </div>
      <ul className="navbar">
        <li>
          <Link href={"/"} className={clsx(isActive("/") && "active")}>
            Trang chủ
          </Link>
        </li>
        <li>
          <Link
            href={"/about"}
            className={clsx(isActive("/about") && "active")}
          >
            Giới thiệu
          </Link>
        </li>
        <li>
          <Link
            href={"/features"}
            className={clsx(isActive("/features") && "active")}
          >
            Tính năng
          </Link>
        </li>
        <li>
          <Link
            href={"/prices"}
            className={clsx(isActive("/prices") && "active")}
          >
            Bảng giá
          </Link>
        </li>
        <li>
          <Link
            href={"/contacts"}
            className={clsx(isActive("/contacts") && "active")}
          >
            Liên hệ
          </Link>
        </li>

        {user ? (
          <li>
            <Link href={""}>{"Hello, " + user?.name}</Link>
          </li>
        ) : null}

        {user ? (
          <li>
            <Link
              href={"/my-mindmap"}
              className={clsx(isActive("/my-mindmap") && "active")}
            >
              Mindmap
            </Link>
          </li>
        ) : (
          <li>
            <Link
              href={"/api/auth/login"}
              className={clsx(isActive("/api/auth/login") && "active")}
            >
              Đăng nhập
            </Link>
          </li>
        )}
        {user ? (
          <li>
            <Link
              href={"/api/auth/logout"}
              className={clsx(isActive("/api/auth/logout") && "active")}
            >
              Đăng xuất
            </Link>
          </li>
        ) : (
          <li>
            <Link
              href={"/api/auth/login"}
              className={clsx(isActive("/api/auth/login") && "active")}
            >
              Đăng ký
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
