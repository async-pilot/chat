import { getServerSession } from "next-auth";

import { authOptions } from "@/core/auth/authOptions";

export const session = async () => {
  return getServerSession(authOptions);
};
