import { NO_INDEX_PAGE } from "@/constants/seo";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { session } from "@/core/services/sessionService";

import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register",
  ...NO_INDEX_PAGE,
};

export default async function RegisterPage() {
  const sess = await session();
  if (sess) redirect("/");

  return <RegisterForm />;
}
