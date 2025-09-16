import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LinksBanana from "@/components/Links_Banana";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Banana Shop",
  description: "this shop is a banana.",
  keyboard: ["Banana", "Shop", "shop", "banana", "Banana Shop", "banana shop"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />

        {children}

        <LinksBanana />
      </body>
    </html>
  );
}
