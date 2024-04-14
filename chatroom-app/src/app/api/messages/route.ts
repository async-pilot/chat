import { NextRequest, NextResponse } from "next/server";

import { mapMessageFromPayload } from "@/core/mappers/messages";
import { getPbClient } from "@/core/services/pbService";
import { IMessagePayload } from "@/core/types/chat.types";

export const GET = async (req: NextRequest) => {
  const pb = await getPbClient();
  const filter = req.nextUrl.searchParams.get("filter");

  try {
    const data = await pb
      .collection("messages")
      .getFullList({ expand: "chat.participants,sender", sort: "-created", ...(filter && { filter }) });
    const users = data.map((item) => mapMessageFromPayload(item as unknown as IMessagePayload));
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
