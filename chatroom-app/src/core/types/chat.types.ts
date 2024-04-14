import { RecordModel } from "pocketbase";

import { IUser } from "./user.types";

export type IMessage = Pick<RecordModel, "collectionId" | "collectionName"> & {
  id: number;
  text: string;
  created: string;
  sender: IUser;
  chat: IChat;
};

export type IMessagePayload = Omit<IMessage, "sender" | "chat"> & {
  expand: {
    sender: IUser;
    chat: IChat;
  };
};

export type IChat = Pick<RecordModel, "collectionId" | "collectionName"> & {
  id: number;
  type: string;
  participants: IUser[];
  created: string;
};

export type IChatPayload = Omit<IChat, "participants"> & {
  expand: {
    participants: IUser[];
  };
};
