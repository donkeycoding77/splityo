import type { Metadata } from "next";
import { Geist, Geist_Mono, Jost, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "splityo.cash - Split Expenses with Friends",
  description: "The easiest way to split expenses with friends, roommates, and groups. No more complicated math or awkward conversations about money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${jost.variable} ${bebasNeue.variable}`}>
      <head />
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
