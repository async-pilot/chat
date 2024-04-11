"use client";

// import useSWRInfinite from "swr/infinite";
// import React, { useCallback, useEffect, useRef } from "react";

// import { apiGet, apiGetExtended } from "@/core/services/apiService";
// import { IChat } from "@/core/types/chat.types";
// import { IUser } from "@/core/types/user.types";
// import { Loader } from "@/components/loader/Loader";

// import { Message } from "./Message";
// import { MessageField } from "./MessageField";

// export function Chat({ id, user }: { id: string; user: IUser }) {
//   const getKey = (pageIndex: number, previousPageData: { totalItems: number; items: IChat[] }) => {
//     if (previousPageData && !previousPageData.items.length) return null;
//     return [`/chats/${id}`, { page: pageIndex + 1, sender: user.id }];
//   };

//   const { data, size, setSize, mutate, isLoading, error } = useSWRInfinite(getKey, apiGetExtended, { initialSize: 1 });

//   const observer = useRef();
//   const lastMessageElementRef = useCallback(
//     (node) => {
//       if (isLoading) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           setSize(size + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [isLoading, setSize, size]
//   );

//   useEffect(() => {
//     // Отключаем наблюдатель, когда компонент размонтируется
//     return () => observer.current?.disconnect();
//   }, []);

//   if (!data) {
//     return;
//   }
//   const currentChat = data[0];
//   const messages = currentChat ? currentChat.items.flatMap((d) => d.messages) : [];
//   console.log(messages);
//   console.log(currentChat);

//   const isLoadingInitialData = !data && !error;
//   const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === "undefined");

//   return (
//     <div
//       style={{
//         gridTemplateRows: isLoading ? "1fr .089fr" : ".6fr 6fr .6fr",
//       }}
//     >
//       <div className="max-h-[80vh] overflow-auto border-t border-border p-layout">
//         {messages.map((message, index) => {
//           if (messages.length === index + 1) {
//             return <Message user={user} ref={lastMessageElementRef} key={message.id} message={message} />;
//           } else {
//             return <Message user={user} key={message.id} message={message} />;
//           }
//         })}
//       </div>
//       <div>{isLoadingMore && <Loader />}</div>
//       <MessageField mutate={mutate} chatId={id} user={user} />
//     </div>
//   );
// }
import useSWR from "swr";
import { useCallback, useEffect, useRef, useState } from "react";

import { apiGet } from "@/core/services/apiService";
import { IChat, IMessage } from "@/core/types/chat.types";
import { IUser } from "@/core/types/user.types";
import { Loader } from "@/components/loader/Loader";

import { ChatHeader } from "./ChatHeader";
import { Message } from "./Message";
import { MessageField } from "./MessageField";

export function Chat({ id, user }: { id: string; user: IUser }) {
  const { data: chat, isLoading, mutate } = useSWR<IChat>(`/chats/${id}`, apiGet);
  // const { data: chat, isLoading } = useSWR<IChat>(`/chats/${id}`, apiGet);
  const [visibleMessages, setVisibleMessages] = useState<IMessage[]>([]);
  const pageSize = 20; // Количество сообщений для отображения на каждой "странице"
  const [loadedAllMessages, setLoadedAllMessages] = useState(false);
  const observer = useRef(null);

  const loadMoreMessages = useCallback(() => {
    if (!chat?.messages || loadedAllMessages) return;

    const nextMessages = chat.messages.slice(0, visibleMessages.length + pageSize);
    setVisibleMessages(nextMessages);
    if (nextMessages.length === chat.messages.length) {
      setLoadedAllMessages(true); // Больше не подгружаем, если достигли конца
    }
  }, [chat?.messages, visibleMessages.length, loadedAllMessages]);

  const lastMessageRef = useCallback(
    (node) => {
      if (isLoading) return; // Загрузка данных, наблюдатель не активен
      if (observer.current) observer.current.disconnect(); // Если наблюдатель уже был создан, отключаем его
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loadedAllMessages) {
          loadMoreMessages();
        }
      });
      if (node) observer.current.observe(node); // Наблюдаем за последним сообщением
    },
    [isLoading, loadedAllMessages, loadMoreMessages]
  );

  useEffect(() => {
    // Инициализируем первую "страницу" сообщений при монтировании
    loadMoreMessages();
  }, [loadMoreMessages]);

  const correspondent = chat?.participants?.find((p) => p.email !== user?.email);
  console.log(visibleMessages);
  return (
    <div
      className="grid h-full border-r border-border"
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
          <div className="max-h-[80vh] overflow-auto border-t border-border p-layout">
            {visibleMessages.map((message, index) => (
              <Message
                user={user}
                key={message.id}
                ref={index + 1 === pageSize ? lastMessageRef : undefined}
                message={message}
              />
            ))}
          </div>
        </>
      )}
      <MessageField chatId={id} mutate={mutate} user={user} />
    </div>
  );
}
