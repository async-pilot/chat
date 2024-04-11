import ChatSidebar from "@/views/chats/ChatSidebar";
import { type PropsWithChildren } from "react";

import { session } from "@/core/services/sessionService";
import { IUser } from "@/core/types/user.types";

export default async function ChatLayout({ children }: PropsWithChildren<unknown>) {
  const sess = await session();
  if (!sess) {
    return;
  }
  return (
    <div className="">
      <ChatSidebar user={sess.user as unknown as IUser}>{children}</ChatSidebar>
    </div>
  );
}
