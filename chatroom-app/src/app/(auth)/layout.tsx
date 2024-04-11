import { PropsWithChildren } from "react";

export default async function LayoutClient({ children }: PropsWithChildren) {
  return (
    <div className="grid h-full min-h-screen w-screen grid-cols-1">
      <section>{children}</section>
    </div>
  );
}
