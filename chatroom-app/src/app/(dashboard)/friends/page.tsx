import { Friends } from "@/views/friends/Friends";
import { Metadata } from "next";

import { session } from "@/core/services/sessionService";
import { IUser } from "@/core/types/user.types";

export const metadata: Metadata = {
  title: "Friends",
};

export default async function FriendsPage() {
  const sess = await session();

  return <Friends user={sess?.user as unknown as IUser} />;
}
