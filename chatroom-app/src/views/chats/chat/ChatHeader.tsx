import { Search } from "lucide-react";
import Image from "next/image";

import { IUser } from "@/core/types/user.types";
import { getFileUrl } from "@/core/utils/pbUtils";

export function ChatHeader({ correspondent }: { correspondent?: IUser }) {
  if (!correspondent) {
    return;
  }

  return (
    <div className="flex items-center justify-between p-layout py-[1.56rem]">
      <div className="flex items-center">
        <Image
          src={correspondent.avatar ? getFileUrl(correspondent, correspondent.avatar) : "/no-avatar.png"}
          alt={""}
          width={40}
          height={40}
          className="mr-4"
          priority
        />
        <div className="text-sm">{correspondent?.username}</div>
      </div>
      <button className="text-[#7C7275] transition-colors ease-linear hover:text-white">
        <Search />
      </button>
    </div>
  );
}
