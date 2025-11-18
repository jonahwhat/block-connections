import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CraftConnections - Daily Minecraft Puzzle",
  description: "Group four Minecraft items together that are related! New puzzles added daily.",
  applicationName: "CraftConnections - Daily Minecraft Puzzle",
  creator: "CraftConnections",
  authors: {
    name: "CraftConnections",
    url: "https://craftconnections.net"
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
    shortcut: "/favicon-large.ico",
  },
  keywords: "craftconnections, minecraftconnections, craftconnections.net, Minecraft, Connections",
  twitter: {
    title: "CraftConnections - Daily Minecraft Puzzle",
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
      <meta property="og:title" content="CraftConnections - Daily Minecraft Puzzle" />
      <meta property="og:description" content="Group four Minecraft items together that are related! New puzzles added daily." />
      <link rel="icon" href="/favicon.ico" sizes="144x144"/>
      <link rel="icon" href="/favicon-48x48.png" sizes="48x48"/>
      <link rel="icon" href="/icon-large.png" sizes="192x192"/>
      <link rel="apple-touch-icon" href="/favicon.png"/>
      <meta property="og:locale" content="en_US" />
      <body className={inter.className}>
        <div itemScope itemType="https://craftconnections.net">
          <meta itemProp="name" content="CraftConnections - Daily Minecraft Puzzle" />
          <meta itemProp="alternateName" content="CraftConnections" />
        </div>
        {children}</body>
    </html>
  );
}
