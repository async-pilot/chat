import { RecordModel } from "pocketbase";

import { IUser } from "./user.types";

export type IMessage = Pick<RecordModel, "collectionId" | "collectionName"> & {
  id: number;
  text: string;
  created: string;
  sender: IUser;
};

export type IMessagePayload = Omit<IMessage, "sender"> & {
  expand: {
    sender: IUser;
  };
};

export type IChat = Pick<RecordModel, "collectionId" | "collectionName"> & {
  id: number;
  messages: IMessage[];
  participants: IUser[];
  created: string;
};

export type IChatPayload = Omit<IChat, "messages" | "participants"> & {
  expand: {
    messages: IMessage[];
    participants: IUser[];
  };
};
