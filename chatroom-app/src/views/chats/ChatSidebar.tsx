"use client";

import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";

import { IUser } from "@/core/types/user.types";

import { CurrentUser } from "./CurrentUser";
import { ChatsList } from "./list/ChatsList";

type Props = { user: IUser } & PropsWithChildren;

export default function ChatSidebar({ user, children }: Props) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarWidth, setSidebarWidth] = useState<number>(268);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        setSidebarWidth(mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left);
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div className="app-container">
      <div
        ref={sidebarRef}
        className="app-sidebar"
        style={{ width: sidebarWidth }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <div style={{ flex: 1 }}>
          <CurrentUser user={user as unknown as IUser} />
          <ChatsList user={user as unknown as IUser} />
        </div>
        <div className="app-sidebar-resizer transition-all" onMouseDown={startResizing} />
      </div>
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
