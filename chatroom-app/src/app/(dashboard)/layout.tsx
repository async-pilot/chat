import LayoutClient from "@/components/Layout/LayoutClient";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <LayoutClient>{children}</LayoutClient>;
}
