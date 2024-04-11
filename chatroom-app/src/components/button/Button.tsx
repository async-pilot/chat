import { InputHTMLAttributes } from "react";

import { cn } from "@/core/utils/cn";

import { Loader } from "../loader/Loader";

interface IButton extends InputHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ isLoading, children, className }: IButton) {
  return (
    <button
      className={cn("rounded-2xl bg-primary px-10 py-2 transition-all duration-100 hover:bg-primary/70", className)}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
}
