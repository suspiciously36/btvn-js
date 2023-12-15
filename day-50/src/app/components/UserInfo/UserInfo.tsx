import Image from "next/image";
import "./userInfo.css";
import LoginInfo from "@/app/components/LoginInfo/LoginInfo";
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

export default function UserInfo({ user, pagetype }: Props) {
  const userName = user?.name ? <h4>{user?.name}</h4> : null;
  const userImage = user?.image ? (
    <Image
      className="user-image"
      src={user?.image}
      width={35}
      height={35}
      alt="userimg"
    />
  ) : null;
  const userEmail = user?.email ? (
    <p className="user-email">{user?.email}</p>
  ) : null;

  return (
    <section className="user-info">
      <div className="user-info_container">
        {userImage}
        <div className="name-email-container">
          {userName}
          {userEmail}
        </div>
      </div>
      <LoginInfo user={user} pagetype={"string"} />
      <hr />
    </section>
  );
}
