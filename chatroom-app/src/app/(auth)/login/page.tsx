import { NO_INDEX_PAGE } from "@/constants/seo";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { session } from "@/core/services/sessionService";

import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
  ...NO_INDEX_PAGE,
};
export default async function Login() {
  const sess = await session();
  if (sess) redirect("/");

  return <LoginForm />;
}
