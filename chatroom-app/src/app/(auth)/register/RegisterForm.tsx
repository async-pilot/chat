"use client";

import { useFormik } from "formik";
import { AtSign, Hash, KeyRound, SquareUserRound } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import formConfig from "@/core/features/forms/register/form-config";
import { RegisterFormFields } from "@/core/features/forms/register/types";
import { apiPost } from "@/core/services/apiService";
import { Button } from "@/components/Button/Button";
import Field from "@/components/Field/Field";

export default function RegisterForm() {
  const queryParams = useSearchParams();

  const onSubmit = async (values: RegisterFormFields) => {
    await apiPost(["/register", values]).then((r) => {
      const body = { identity: values.email, password: values.password };
      return signIn("credentials", {
        redirect: true,
        callbackUrl: queryParams.get("callbackUrl") ?? undefined,
        ...body,
      });
    });
  };

  const formik = useFormik<RegisterFormFields>(
    formConfig({
      onSubmit,
    })
  );

  return (
    <div className="grid h-full w-full items-center justify-center gap-5">
      <form
        className="flex w-96 max-w-md flex-col gap-4 rounded-lg border border-border p-10"
        onSubmit={formik.handleSubmit}
      >
        <p className="text-center text-xl font-bold">Register</p>
        <div className="flex flex-col gap-2">
          <Field
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter email"
            type="email"
            Icon={AtSign}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500/70">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <Field
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter name"
            type="text"
            Icon={SquareUserRound}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500/70">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <Field
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter username"
            type="text"
            Icon={Hash}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500/70">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <Field
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter password"
            Icon={KeyRound}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500/70">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <Field
            name="passwordConfirm"
            type="password"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter passwordConfirm"
            Icon={KeyRound}
          />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
            <div className="text-red-500/70">{formik.errors.passwordConfirm}</div>
          ) : null}
        </div>
        <Button isLoading={formik.isSubmitting} disabled={formik.isSubmitting} type="submit">
          Register
        </Button>
        <div className="mt-10 flex items-center justify-center gap-1">
          <p>Do you have account?</p>
          <Link href="/login" className="underline transition-all hover:text-primary hover:text-opacity-60">
            Login now!
          </Link>
        </div>
      </form>
    </div>
  );
}
