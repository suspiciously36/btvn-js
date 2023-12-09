import React from "react";
import image404 from "@/assets/images/404.png";
import Image from "next/image";
import Link from "next/link";
const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <Image
        src={image404}
        alt="404"
        style={{
          maxWidth: 400,
          height: "auto",
        }}
      />
      <h2>Lạc đường rồi, vui lòng về trang chủ.</h2>
      <Link href={"/"}>Về bờ</Link>
    </div>
  );
};

export default NotFound;
