import PocketBase from "pocketbase";
import { useEffect } from "react";

import { pocketbaseUrl } from "@/core/config/apiRoutes";
import { mapMessageFromPayload } from "@/core/mappers/messages";
import { IMessagePayload } from "@/core/types/chat.types";
import { IUser } from "@/core/types/user.types";
import { showToast } from "@/components/notification/Notification";

export const useChatSubscription = (chatId: string, user: IUser) => {
  useEffect(() => {
    const pb = new PocketBase(pocketbaseUrl);
    const handleFirstUserInteraction = () => {
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
    };

    window.addEventListener("click", handleFirstUserInteraction);
    window.addEventListener("keydown", handleFirstUserInteraction);

    pb.collection("messages").subscribe(
      "*",
      (e) => {
        const message = mapMessageFromPayload(e.record as unknown as IMessagePayload);
        console.log(message.sender?.id !== user.id);
        if (e.action === "create" && message.sender?.id !== user.id) {
          showToast({ message: `New message from ${message.sender.username}`, status: "info" });
        }
      },
      { expand: "sender, chat.participants" }
    );

    return () => {
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
      pb.collection("chats").unsubscribe("*");
    };
  }, [chatId, user]);
};
