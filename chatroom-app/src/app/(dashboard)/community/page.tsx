import Users from "@/views/community/Users";
import { Metadata } from "next";

import { session } from "@/core/services/sessionService";
import { IUser } from "@/core/types/user.types";

export const metadata: Metadata = {
  title: "Community",
};

export default async function Community() {
  const sess = await session();

  if (!sess) {
    return;
  }

  return <Users user={sess?.user as unknown as IUser} />;
}
