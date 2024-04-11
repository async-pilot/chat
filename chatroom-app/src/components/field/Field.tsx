import { forwardRef } from "react";

import { cn } from "@/core/utils/cn";

import { TypeInputProps } from "./field.types";

const Field = forwardRef<HTMLInputElement, TypeInputProps>(({ style, Icon, className, ...rest }, ref) => {
  return (
    <label className={cn("relative flex items-center", className)} style={style}>
      {Icon && (
        <div className="mr-3 text-[#585654] transition-colors duration-300 ease-linear focus-within:text-white">
          <Icon />
        </div>
      )}
      <input
        ref={ref}
        className="w-full rounded-lg border border-white border-opacity-10 bg-transparent px-3 py-1 outline-none transition-colors duration-300 ease-linear placeholder:text-[#585654]"
        {...rest}
      />
    </label>
  );
});

Field.displayName = "Field";

export default Field;
