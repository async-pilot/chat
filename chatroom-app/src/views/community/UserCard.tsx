import { Check, Plus } from "lucide-react";
import { KeyedMutator } from "swr";
import { useState } from "react";
import Image from "next/image";

import { apiPatch } from "@/core/services/apiService";
import { IUser } from "@/core/types/user.types";
import { getFileUrl } from "@/core/utils/pbUtils";
import { Loader } from "@/components/loader/Loader";
import { showToast } from "@/components/notification/Notification";

type Props = {
  user: IUser;
  isFriend: boolean;
  currentUser: IUser;
  usersMutate: KeyedMutator<IUser[]>;
  currentUserMutate: KeyedMutator<IUser>;
};

async function addFriend(currentUser: IUser, friendId: string, onSuccess: () => void, onError: (error: any) => void) {
  try {
    await apiPatch([`/users/${currentUser.id}`, { friends: [...currentUser.friends.map(({ id }) => id), friendId] }]);
    onSuccess();
  } catch (e) {
    onError(e);
  }
}

export default function UserCard({ user, usersMutate, currentUserMutate, currentUser, isFriend }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { avatar, username, email, name, id } = user;

  const handleAddFriend = async () => {
    setIsLoading(true);
    await addFriend(
      currentUser,
      id,
      () => {
        setIsLoading(false);
        usersMutate();
        currentUserMutate();
        showToast({ message: `New friend ${username} was added`, status: "success" });
      },
      (e) => {
        setIsLoading(false);
        console.error(`failed to add new friend: `, e);
        showToast({ message: `Failed to add ${username} as a friend`, status: "error" });
      }
    );
  };

  return (
    <div className="flex h-56 w-full flex-col items-center justify-between rounded-2xl border border-border p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow hover:shadow-white/30">
      <Image
        src={avatar ? getFileUrl(user, avatar) : "/no-avatar.png"}
        className="rounded-full"
        width={85}
        height={85}
        alt={email}
      />
      <div className="flex w-full flex-col items-start gap-1">
        <p>Name: {name}</p>
        <p>Username: {username}</p>
      </div>
      <div className="flex w-full justify-end">
        {isLoading ? <Loader /> : isFriend ? <Check /> : <Plus className="cursor-pointer" onClick={handleAddFriend} />}
      </div>
    </div>
  );
}
