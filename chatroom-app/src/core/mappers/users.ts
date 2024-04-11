import { IUser, IUserPayload } from "@/core/types/user.types";

export const mapUserFromPayload = (payload: IUserPayload): IUser => {
  return {
    id: payload?.id ?? "",
    friends: payload?.expand?.friends ?? [],
    username: payload?.username ?? "",
    email: payload?.email ?? "",
    name: payload?.name ?? "",
    confirmed: payload?.confirmed ?? false,
    role: payload?.role ?? "",
    avatar: payload?.avatar ?? "",
    collectionName: payload?.collectionName ?? "",
    collectionId: payload?.collectionId ?? "",
  };
};
