import { NextRequest, NextResponse } from "next/server";

import { mapChatFromPayload } from "@/core/mappers/chats";
import { getPbClient } from "@/core/services/pbService";
import { IChatPayload } from "@/core/types/chat.types";

export const GET = async (req: NextRequest) => {
  const pb = await getPbClient();
  const filter = req.nextUrl.searchParams.get("filter");

  try {
    const data = await pb.collection("chats").getFullList({ ...(filter && { filter }), expand: "participants" });

    const chats = data.map((item) => mapChatFromPayload(item as unknown as IChatPayload));
    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
