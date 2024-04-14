"use client";

import { useInView } from "react-intersection-observer";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { UIEvent, useEffect } from "react";

import { apiGet, apiGetExtended } from "@/core/services/apiService";
import { IChat, IMessage } from "@/core/types/chat.types";
import { IUser } from "@/core/types/user.types";
import { cn } from "@/core/utils/cn";
import { Loader } from "@/components/loader/Loader";

import { ChatHeader } from "./ChatHeader";
import { Message } from "./Message";
import { MessageField } from "./MessageField";

type TableData = {
  items: IMessage[];
};

export function Chat({ id, user }: { id: string; user: IUser }) {
  const [scrollRef, inView, entry] = useInView({
    trackVisibility: true,
    delay: 1000,
  });
  const getKey = (pageIndex: number, previousPageData: { totalItems: number; items: IChat[] }) => {
    if (previousPageData && !previousPageData.items.length) return null;
    return [`/messages/${id}`, { page: pageIndex + 1, sender: user.id }];
  };

  const { data, size, isLoading, mutate, setSize, error } = useSWRInfinite(getKey, apiGetExtended, { initialSize: 1 });

  const { data: chat } = useSWR<IChat>(`/chats/${id}`, apiGet);

  const messages = (data ? data?.reduce((acc: IMessage[], val) => [...acc, ...val.items], []) : []) as IMessage[];
  const totalItems = data?.[0]?.totalItems ?? 0;

  const isLoadingMore = size > 0 && data && typeof data[size - 1] === "undefined";
  const isReachingEnd = totalItems && messages.length >= totalItems;

  const loadMore = () => {
    if (!isReachingEnd && !isLoadingMore) {
      setSize(size + 1);
    }
  };

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const target = event.target as HTMLDivElement;
    console.log(target.scrollTop);
    const top = target.scrollTop <= 100;

    if (top && !isLoadingMore && !isReachingEnd) {
      loadMore();
    }
  }
  useEffect(() => {
    if (entry?.target) {
      entry.target.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [data, entry?.target]);
  if (!messages || !chat) {
    return;
  }
  const correspondent = chat.participants?.find((p) => p.email !== user?.email);

  return (
    <div
      className=" relative grid h-full border-r border-border"
      style={{
        gridTemplateRows: isLoading ? "1fr .089fr" : ".6fr 6fr .6fr",
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <ChatHeader correspondent={correspondent} />
          <div onScroll={handleScroll} className="max-h-[80vh] overflow-auto border-t border-border p-layout">
            {messages.reverse().map((message) => (
              <Message user={user} key={message.id} message={message} />
            ))}
            <div ref={scrollRef} />
          </div>
          {!inView && (
            <button
              className={cn("absolute top-[80%] z-40 h-10 w-full p-0 text-xs")}
              onClick={() => {
                console.log("first");
                entry?.target.scrollIntoView({ behavior: "smooth", block: "end" });
              }}
            >
              Scroll to see latest messages
            </button>
          )}
        </>
      )}
      <div className="flex min-w-full">
        <MessageField chatId={id} mutate={mutate} user={user} />
      </div>
    </div>
  );
}
