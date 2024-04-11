"use client";

// import { useAuth } from "@/hooks/useAuth";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import { getImageUrl } from "@/app/config/get-image-url.config";
import { IChat } from "@/core/types/chat.types";
import { IUser } from "@/core/types/user.types";
import { getFileUrl } from "@/core/utils/pbUtils";

interface IChatListItem {
  chat: IChat;
  user: IUser;
}

/*
	TODO:
		[ ] - Toggle friend
		[ ] - Settings profile
		[ ] - ??? Mobile adaptive
*/

export function ChatListItem({ chat, user }: IChatListItem) {
  // const { user } = useAuth();

  const correspondent = chat.participants.find((u) => u.email !== user?.email);
  const lastMessage = chat.messages.at(-1);

  return (
    <Link
      href={`/chat/${chat.id}`}
      className="animation-slide-fade flex items-center border-b border-border p-layout transition-colors duration-300 ease-linear hover:bg-border"
    >
      <Image
        src={
          correspondent && correspondent?.avatar ? getFileUrl(correspondent, correspondent?.avatar) : "/no-avatar.png"
        }
        alt={correspondent?.email || ""}
        width={45}
        height={45}
        className="mr-4"
      />
      <div className="w-full text-sm">
        <div className="flex items-center justify-between">
          <span>{correspondent?.username}</span>
          <span className="text-xs opacity-30">{dayjs(lastMessage?.created).format("HH:mm")}</span>
        </div>
        <div className="mt-0.5 opacity-30">{lastMessage?.text}</div>
      </div>
    </Link>
  );
}
