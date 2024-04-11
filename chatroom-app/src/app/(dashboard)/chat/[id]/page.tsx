import { NO_INDEX_PAGE } from "@/constants/seo";
import { Chat } from "@/views/chats/chat/Chat";
import { Metadata } from "next";

import { session } from "@/core/services/sessionService";
import { IUser } from "@/core/types/user.types";

export const metadata: Metadata = {
  ...NO_INDEX_PAGE,
};

export default async function ChatPage({ params }: { params: { id: string } }) {
  const sess = await session();

  if (!sess || !sess.user) {
    return;
  }

  return <Chat user={sess.user as unknown as IUser} id={params.id} />;
}
