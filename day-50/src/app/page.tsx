import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Navbar from "./components/Navbar/Navbar";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  return (
    <>
      <h1
        style={{
          margin: "100px",
        }}
      >
        Chưa có gì cả
      </h1>
      <Navbar />
    </>
  );
}
