"use client";

import { $fetch } from "@/$api/api.fetch";
// import { useAuth } from "@/hooks/useAuth";
import { useChatSubscription } from "@/hooks/useChatSubscription";
import { useFormik } from "formik";
// import { useMutation } from "@tanstack/react-query";
import { ArrowRightToLine, Send } from "lucide-react";
import { KeyedMutator } from "swr";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { apiPatch, apiPost } from "@/core/services/apiService";
import { IChat, IMessage } from "@/core/types/chat.types";
import { IUser } from "@/core/types/user.types";
import Field from "@/components/field/Field";

export function MessageField({ chatId, user, mutate }: { user: IUser; mutate: KeyedMutator<IChat>; chatId: string }) {
  // const [message, setMessage] = useState("");

  useChatSubscription(chatId, user);
  // const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: Yup.object({
      text: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        text: values.text,
        sender: user?.id,
        chat: chatId,
      };
      await apiPatch([`/chats/${chatId}`, data]);
      resetForm();

      mutate();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex items-center justify-between border-t border-border p-layout">
      <Field
        placeholder="Write a message..."
        Icon={ArrowRightToLine}
        name="text"
        value={formik.values.text}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        className="w-4/5"
      />
      <button type="submit" disabled={formik.isSubmitting} className="transition-colors hover:text-primary">
        <Send />
      </button>
    </form>
  );
}
