import Image from "next/image";

type User =
  | {
      image?: string | null | undefined;
    }
  | undefined;

type Props = {
  user: User;
  pagetype: string;
};

export default function UserImage({ user, pagetype }: Props) {
  const userImage = user?.image ? (
    <Image
      className="user-image-2"
      src={user?.image}
      width={35}
      height={35}
      alt="userimg"
    />
  ) : null;
  return <>{userImage}</>;
}
