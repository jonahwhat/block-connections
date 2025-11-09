import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Craft Connections",
  description: "Group four Minecraft items together that are related!",
   icons: {
    icon: "/cube.ico"
  },
  keywords: "Minecraft, Connections, craft, connectionscraft, craftconnections, puzzle game, wordle, word game", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
