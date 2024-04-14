"use client";

import { uniqueId } from "lodash";
import useSWR from "swr";

import { apiGet } from "@/core/services/apiService";
import { IUser } from "@/core/types/user.types";
import { Loader } from "@/components/loader/Loader";

import FriendCard from "./FriendCard";

export function Friends({ user }: { user: IUser }) {
  const { data: users } = useSWR<IUser[]>("/users", apiGet);
  const { data: currentUser } = useSWR<IUser>(`/users/${user.id}`, apiGet);
  console.log(user.id);
  if (!users || !currentUser) {
    return <Loader />;
  }

  return (
    <div className="grid max-h-[95vh] grid-cols-4 gap-3 overflow-auto p-10">
      {currentUser?.friends.map((user) => <FriendCard key={uniqueId()} user={user} />)}
    </div>
  );
}
