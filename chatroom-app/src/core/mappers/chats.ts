import { IChat, IChatPayload, IMessage, IMessagePayload } from "@/core/types/chat.types";

import { mapMessageFromPayload } from "./messages";

export const mapChatFromPayload = (payload: IChatPayload): IChat => {
  const chat: IChat = {
    id: payload?.id ?? "",
    messages: [],
    participants: payload?.expand?.participants ?? [],
    created: payload?.created ?? "",
    collectionName: payload?.collectionName ?? "",
    collectionId: payload?.collectionId ?? "",
  };

  if (payload.expand && payload.expand.messages) {
    chat.messages = payload.expand.messages.map((messagePayload: IMessage) => {
      return mapMessageFromPayload(messagePayload as unknown as IMessagePayload);
    });
  }

  return chat;
};
