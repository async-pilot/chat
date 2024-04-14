import { IChatPayload, IMessage, IMessagePayload } from "@/core/types/chat.types";

import { mapChatFromPayload } from "./chats";

export const mapMessageFromPayload = (payload: IMessagePayload): IMessage => {
  return {
    id: payload?.id ?? "",
    sender: payload?.expand?.sender ?? {},
    chat: mapChatFromPayload(payload?.expand?.chat as unknown as IChatPayload) ?? {},
    text: payload?.text ?? "",
    created: payload?.created ?? "",
    collectionName: payload?.collectionName ?? "",
    collectionId: payload?.collectionId ?? "",
  };
};
