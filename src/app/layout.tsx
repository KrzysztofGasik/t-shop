import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import classes from "./layout.module.css";
import Navigation from "@/app/navigation/navigation";
import Footer from "@/components/footer";
import SessionProvider from "./session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "T-shop",
  description: "T-shop - metal shop online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navigation />
          <main className={classes.main}>{children}</main>
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
