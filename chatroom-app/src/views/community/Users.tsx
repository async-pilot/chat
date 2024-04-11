"use client";

import useSWR from "swr";

import { apiGet } from "@/core/services/apiService";
import { IUser } from "@/core/types/user.types";
import { Loader } from "@/components/loader/Loader";

import UserCard from "./UserCard";

export default function Users({ user }: { user: IUser }) {
  const { data: users, mutate: usersMutate } = useSWR<IUser[]>("/users", apiGet);
  const { data: currentUser, mutate: currentUserMutate } = useSWR<IUser>(`/users/${user.id}`, apiGet);

  if (!users || !currentUser) {
    return <Loader />;
  }

  const filteredFriendIds = currentUser.friends.filter(({ id }) => id !== currentUser.id).map(({ id }) => id);

  return (
    <div className="grid max-h-[95vh] grid-cols-4 gap-3 overflow-auto p-10">
      {users.map((userItem) => {
        if (userItem.id === user.id) {
          return null;
        }
        return (
          <div key={userItem.id}>
            <UserCard
              currentUser={currentUser}
              usersMutate={usersMutate}
              currentUserMutate={currentUserMutate}
              user={userItem}
              isFriend={filteredFriendIds.includes(userItem.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
