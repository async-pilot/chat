import { NextRequest, NextResponse } from "next/server";

import { mapUserFromPayload } from "@/core/mappers/users";
import { getPbClient } from "@/core/services/pbService";
import { IUserPayload } from "@/core/types/user.types";

export const GET = async (req: NextRequest) => {
  const pb = await getPbClient();

  try {
    const data = await pb.collection("users").getFullList({ expand: "friends" });
    const users = data.map((item) => mapUserFromPayload(item as unknown as IUserPayload));
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
