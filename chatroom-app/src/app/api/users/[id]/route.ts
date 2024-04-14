import { NextRequest, NextResponse } from "next/server";

import { mapUserFromPayload } from "@/core/mappers/users";
import { getPbClient } from "@/core/services/pbService";
import { IUserPayload } from "@/core/types/user.types";

type Params = {
  params: { id: string };
};

export const GET = async (req: NextRequest, { params }: Params) => {
  const pb = await getPbClient();

  const { id } = params;

  try {
    const data = await pb.collection("users").getOne(id, { expand: "friends" });
    console.log(id);
    const user = mapUserFromPayload(data as unknown as IUserPayload);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const pb = await getPbClient();
  const body = await req.json();
  const { id } = params;
  console.log(body);
  try {
    const data = await pb.collection("users").update(id, body);
    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
