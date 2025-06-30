import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/Header";


export const metadata: Metadata = {
  title: "Learn AuthNext.js",
  description: "Learn AuthNext.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
