import Image from "next/image";

import { IUser } from "@/core/types/user.types";
import { getFileUrl } from "@/core/utils/pbUtils";

type Props = {
  user: IUser;
};

export default function FriendCard({ user }: Props) {
  const { avatar, email, username, name, role, friends } = user;
  return (
    <div className="flex h-80 w-full flex-col items-center justify-between rounded-2xl border border-border p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow hover:shadow-white/30">
      <Image
        src={avatar ? getFileUrl(user, avatar) : "/no-avatar.png"}
        className="rounded-full"
        width={85}
        height={85}
        alt={user.email ?? ""}
      />
      <div className="flex w-full flex-col items-start gap-1">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Username: {username}</p>
        <p>Role: {role}</p>
        <p>Friends: {friends.length}</p>
      </div>
    </div>
  );
}
