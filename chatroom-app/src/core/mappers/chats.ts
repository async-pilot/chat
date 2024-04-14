import { IChat, IChatPayload } from "@/core/types/chat.types";

export const mapChatFromPayload = (payload: IChatPayload): IChat => {
  return {
    id: payload?.id ?? "",
    type: payload.type ?? "",
    participants: payload?.expand?.participants ?? [],
    created: payload?.created ?? "",
    collectionName: payload?.collectionName ?? "",
    collectionId: payload?.collectionId ?? "",
  };
};
