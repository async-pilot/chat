import { getServerSession } from "next-auth";
import PocketBase from "pocketbase";

import { authOptions } from "@/core/auth/authOptions";
import { pocketbaseUrl } from "@/core/config/apiRoutes";

export const getPbClient = async (token?: string): Promise<PocketBase> => {
  const pb = new PocketBase(pocketbaseUrl);
  const session = await getServerSession(authOptions);
  if (session) {
    // throw new Error("could not get session - possibly unauthorized");

    pb.beforeSend = (url, options) => {
      options.headers = Object.assign({}, options.headers, {
        Authorization: token ?? session.user.pbToken,
      });
      return { url, options };
    };
  }

  return pb;
};
