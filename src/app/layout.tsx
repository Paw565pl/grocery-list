import NavBar from "@/components/navbar";
import Providers from "@/components/providers";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grocery list",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          <main className="space-y-4 p-5 md:px-10 lg:px-12">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
