import { NextRequest, NextResponse } from "next/server";

import { getPbClient } from "@/core/services/pbService";

export const POST = async (req: NextRequest) => {
  const pb = await getPbClient();
  const body = await req.json();

  try {
    const data = await pb.collection("users").create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
