// import { useAuth } from "@/hooks/useAuth";
import dayjs from "dayjs";
import { forwardRef } from "react";
import Image from "next/image";

import { IMessage } from "@/core/types/chat.types";
import { IUser } from "@/core/types/user.types";
import { cn } from "@/core/utils/cn";
import { getFileUrl } from "@/core/utils/pbUtils";

const Message = ({ message, user }: { message: IMessage; user: IUser }) => {
  const isSender = user?.email === message.sender.email;

  return (
    <div className={cn("mb-2.5 flex", isSender ? "justify-end" : "justify-start")}>
      <div className={cn("relative flex items-center", isSender ? "flex-row-reverse" : "")}>
        <Image
          src={message.sender.avatar ? getFileUrl(message.sender, message.sender.avatar) : "/no-avatar.png"}
          alt="Avatar"
          className="rounded-full"
          width={50}
          height={50}
        />
        <div className={cn(isSender ? "mr-3" : "ml-3")}>
          <div
            className={cn(
              "mt-4 rounded-2xl px-3 py-1.5 text-sm text-white",
              isSender ? "rounded-tr-none bg-primary" : "rounded-tl-none bg-border"
            )}
          >
            {message.text}
          </div>
          <div className={cn("mt-1.5 block text-xs opacity-30", isSender ? "text-right" : "text-left")}>
            {dayjs(message.created).format("HH:mm")}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Message };
