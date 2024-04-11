import { Cog } from "lucide-react";

export default function NotAvailablePage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center opacity-65">
      <Cog width={250} height={250} className="animate-spin-slow" />
      <p className="text-xl">The page is under construction</p>
    </div>
  );
}
