"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import UserInfo from "../components/UserInfo/UserInfo";

export default function ClientPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("api/auth/signin?callbackUrl=/profile");
    },
  });

  return (
    <>
      <Navbar />
      <UserInfo user={session?.user} pagetype={"Client"} />
    </>
  );
}
