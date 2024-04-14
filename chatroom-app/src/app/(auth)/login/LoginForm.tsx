"use client";

import { useFormik } from "formik";
import { AtSign, KeyRound } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import formConfig from "@/core/features/forms/login/form-config";
import { LoginFormFields } from "@/core/features/forms/login/types";
import { Button } from "@/components/Button/Button";
import Field from "@/components/Field/Field";

export default function LoginForm() {
  const queryParams = useSearchParams();

  const onSubmit = async (values: LoginFormFields) => {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: queryParams.get("callbackUrl") ?? undefined,
      ...values,
    });
  };

  const formik = useFormik<LoginFormFields>(
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
        <p className="text-center text-xl font-bold">Login</p>
        <div className="flex flex-col gap-2">
          <Field
            name="identity"
            value={formik.values.identity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter email/username"
            type="text"
            Icon={AtSign}
          />
          {formik.touched.identity && formik.errors.identity ? (
            <div className="text-red-500/70">{formik.errors.identity}</div>
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
        <Button isLoading={formik.isSubmitting} disabled={formik.isSubmitting} type="submit">
          Login
        </Button>
        <div className="mt-10 flex items-center justify-center gap-1">
          <p>Dont have account?</p>
          <Link href="/register" className="underline transition-all hover:text-primary hover:text-opacity-60">
            Sign up now!
          </Link>
        </div>
      </form>
    </div>
  );
}
