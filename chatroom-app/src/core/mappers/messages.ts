import { IMessage, IMessagePayload } from "@/core/types/chat.types";

export const mapMessageFromPayload = (payload: IMessagePayload): IMessage => {
  return {
    id: payload?.id ?? "",
    sender: payload?.expand?.sender ?? {},
    text: payload?.text ?? "",
    created: payload?.created ?? "",
    collectionName: payload?.collectionName ?? "",
    collectionId: payload?.collectionId ?? "",
  };
};
