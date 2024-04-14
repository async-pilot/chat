"use client";

import { Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/core/utils/cn";

import { MENU } from "./sidebarData";

export function Sidebar() {
  const pathname = usePathname();
  const isLoggedIn = true;
  return (
    pathname !== "/" && (
      <aside className="flex flex-col items-center justify-between border-r border-border py-layout">
        {isLoggedIn ? (
          <>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="echo wave"
                width={35}
                height={35}
                priority
                className="opacity-80 transition-all hover:opacity-100"
              />
            </Link>
            <div>
              {MENU.map((item) => {
                return (
                  <Link
                    href={item.url}
                    key={item.url}
                    className={cn("mb-8 block", pathname.startsWith(item.url) ? "text-white" : "text-[#7C7275] ")}
                  >
                    <item.icon size={27} className="transition-colors duration-300 ease-in-out hover:text-white" />
                  </Link>
                );
              })}
            </div>
            <Sun size={27} />
          </>
        ) : null}
      </aside>
    )
  );
}
