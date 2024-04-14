"use client";

import { useChatSubscription } from "@/hooks/useChatSubscription";
import { useFormik } from "formik";
import { ArrowRightToLine, Send } from "lucide-react";
import * as Yup from "yup";

import { apiPatch } from "@/core/services/apiService";
import { IUser } from "@/core/types/user.types";
import Field from "@/components/Field/Field";

export function MessageField({ chatId, user, mutate }: { user: IUser; mutate: any; chatId: string }) {
  useChatSubscription(chatId, user);
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
    <form
      onSubmit={formik.handleSubmit}
      className="flex w-full items-center justify-between border-t border-border p-layout"
    >
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
