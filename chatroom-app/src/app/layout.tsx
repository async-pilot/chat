import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social media EchoWave",
  icons: "/logo.png",
};

export const viewport: Viewport = {
  themeColor: "#0E0B18",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="grid min-h-screen">{children}</div>
      </body>
    </html>
  );
}
