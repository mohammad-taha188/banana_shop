import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LinksBanana from "@/components/Links_Banana";

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
        <header className="header w-full h-[200px] rounded-bl-[60%_20%] rounded-br-[60%_20%] flex justify-center">
          <div className="px-3 py-2"></div>
          <Link href={"/"} className="inline h-10">
            <h1 className="text-4xl mt-6 text-amber-950">Banana Shop</h1>
          </Link>
        </header>
        {children}
        <LinksBanana />
      </body>
    </html>
  );
}
