import { Toaster } from "react-hot-toast";
import { PropsWithChildren } from "react";

import { session } from "@/core/services/sessionService";

import { Sidebar } from "./sidebar/Sidebar";

import "./Layout.css";

export default async function LayoutClient({ children }: PropsWithChildren<unknown>) {
  const sess = await session();
  return (
    <div className="layout">
      {sess && <Sidebar />}
      <section>{children}</section>
      <Toaster position="top-right" />
    </div>
  );
}
