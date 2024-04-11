import { RecordModel } from "pocketbase";

export type IUser = Pick<RecordModel, "collectionId" | "collectionName"> & {
  id: string;
  username: string;
  name: string;
  email: string;
  confirmed: boolean;
  role: string;
  friends: IUser[];
  avatar?: string;
};

export type IUserPayload = Omit<IUser, "friends"> & {
  expand: {
    friends: IUser[];
  };
};

export type UserJwt = {
  user: IUser;
  jwt: string;
};
