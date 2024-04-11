import PocketBase from "pocketbase";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import { pocketbaseUrl } from "@/core/config/apiRoutes";
import { mapChatFromPayload } from "@/core/mappers/chats";
import { IChatPayload } from "@/core/types/chat.types";
import { IUser } from "@/core/types/user.types";
import { showToast } from "@/components/notification/Notification";

type Props = {
  user: IUser;
  chatId: string;
};

export const useChatSubscription = (chatId: string, user: IUser) => {
  useEffect(() => {
    const pb = new PocketBase(pocketbaseUrl);
    const handleFirstUserInteraction = () => {
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
    };

    window.addEventListener("click", handleFirstUserInteraction);
    window.addEventListener("keydown", handleFirstUserInteraction);
    pb.collection("chats").subscribe(
      "*",
      (e) => {
        const chat = mapChatFromPayload(e.record as unknown as IChatPayload);

        if (e.action === "update") {
          const lastMessage = chat.messages[chat.messages.length - 1];

          if (lastMessage.sender.id === user.id) {
            return;
          }

          const lastSenderUsername = lastMessage.sender.username;
          let showToastFlag = false;

          chat.participants.forEach((participant) => {
            if (user.username !== lastSenderUsername) {
              showToastFlag = true;
            }
          });

          if (showToastFlag) {
            showToast({ message: `New message from ${lastMessage.sender.username}`, status: "info" });
          }
        }
      },
      { expand: "messages.sender,participants" }
    );

    return () => {
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("keydown", handleFirstUserInteraction);
      pb.collection("chats").unsubscribe("*");
    };
  }, [chatId, user]);
};
