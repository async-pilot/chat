import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { NextRequest, NextResponse } from "next/server";

import { mapMessageFromPayload } from "@/core/mappers/messages";
import { getPbClient } from "@/core/services/pbService";
import { IMessagePayload } from "@/core/types/chat.types";

type Params = {
  params: { id: string };
};

export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = params;

  const pb = await getPbClient();
  const page = req.nextUrl.searchParams.get("page");

  try {
    const res = await pb.collection("messages").getList(Number(page), DEFAULT_PAGE_SIZE, {
      expand: "sender,chat.participants",
      filter: `chat = "${id}"`,
      sort: "-created",
    });
    const messages = res.items.map((data) => mapMessageFromPayload(data as unknown as IMessagePayload));
    return NextResponse.json({ ...res, items: messages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
