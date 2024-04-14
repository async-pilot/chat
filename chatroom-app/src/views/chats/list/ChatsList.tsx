"use client";

import { Search, Snail } from "lucide-react";
import useSWR from "swr";
import { useState } from "react";

import { apiGetExtended } from "@/core/services/apiService";
import { IChat } from "@/core/types/chat.types";
import { IUser } from "@/core/types/user.types";
import Field from "@/components/Field/Field";
import { Loader } from "@/components/loader/Loader";

import { ChatListItem } from "./ChatListItem";

export function ChatsList({ user }: { user: IUser }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filter = `participants ~ "${user.id}"`;

  const { data: chats, isLoading } = useSWR<IChat[]>(["/chats", { filter }], apiGetExtended as any);

  const availableChats = chats?.filter((chat) =>
    chat.participants.some((participant) => {
      if (user) {
        if (participant.id === user.id) {
          return true;
        }
        if (user.friends && user.friends.some((friend) => String(friend) === participant.id)) {
          return true;
        }
      }
      return false;
    })
  );

  function renderContent() {
    if (isLoading) {
      return (
        <div className="mt-20 flex w-full justify-center p-layout">
          <Loader />
        </div>
      );
    }

    if (!chats || !user) {
      return (
        <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
          <Snail width={50} height={50} />
          <p className="text-center">You don&apos;t have available chats</p>
        </div>
      );
    }

    return availableChats?.map((chat) => <ChatListItem user={user} key={chat.id} chat={chat} />);
  }

  return (
    <div>
      <div className="border-b border-t border-border p-layout">
        <Field
          placeholder="Search chats"
          Icon={Search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid max-h-[79vh] gap-3 overflow-auto">{renderContent()}</div>
    </div>
  );
}
