import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Atlas Notes",
  description: "A multi user document editing platform.",
  icons: {
    icon: "/logo.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased")}
    >
      <body className="min-h-screen flex flex-col relative">
        <main>
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
