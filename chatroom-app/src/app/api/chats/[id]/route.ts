import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { NextRequest, NextResponse } from "next/server";

import { mapChatFromPayload } from "@/core/mappers/chats";
import { getPbClient } from "@/core/services/pbService";
import { IChat, IChatPayload } from "@/core/types/chat.types";

type Params = {
  params: { id: string };
};

export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  const page = req.nextUrl.searchParams.get("page");
  const sender = req.nextUrl.searchParams.get("sender");

  const pb = await getPbClient();

  try {
    const data: IChat = await pb.collection("chats").getOne(id, { expand: "messages.sender,participants" });

    if (page) {
      const participants = data.participants.filter((participant) => String(participant) !== sender);
      const recipient = participants[0];

      const res = await pb.collection("chats").getList(Number(page), DEFAULT_PAGE_SIZE, {
        filter: `participants ~ "${sender}" && participants ~ "${recipient}"`,
        expand: "participants",
      });

      const chats = res.items.map((data) => mapChatFromPayload(data as unknown as IChatPayload));
      return NextResponse.json({ ...res, items: chats }, { status: 200 });
    }

    const chat = mapChatFromPayload(data as unknown as IChatPayload);

    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  const pb = await getPbClient();
  const body = await req.json();

  try {
    const message = await pb.collection("messages").create(body);

    const currentChats = await pb
      .collection("chats")
      .getFullList({ filter: `id = "${id}"`, expand: "messages.sender" });
    const currentChat = currentChats[0];
    const updatedMessagesIds =
      currentChat && currentChat.messages ? [...currentChat.messages, message.id] : [message.id];

    const data = await pb.collection("chats").update(id, { messages: updatedMessagesIds });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
