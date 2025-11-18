import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CraftConnections",
  description: "Group four Minecraft items together that are related!",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
  },
  keywords: "Minecraft, Connections, craft, connectionscraft, craftconnections, puzzle game, wordle, word game, minecraft connections, craftconnections.net",
  twitter: {
    title: "Craft Connections",
    description: "Group four Minecraft items together that are related!",
  },
  verification: {
    google: "TsXpzkOmM6ys5hHfwm3kEceFfCKnsWiKukj4f9Dmj8w"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://craftconnections.net",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta property="og:title" content="Craft Connections - Daily Minecraft Puzzle" />
      <meta property="og:description" content="Group four Minecraft items together that are related!" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
