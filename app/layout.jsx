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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col place-content-between`}
      >
        <div className="">
          <Header />
        </div>

        <div className="justify-self-start mb-auto mt-4">{children}</div>

        <div className="">
          <LinksBanana />{" "}
          <footer className="self-end footer w-full h-[200px] rounded-tl-[60%_20%] rounded-tr-[60%_20%] flex justify-end flex-col p-4">
            <div className="px-3 py-2"></div>
            &copy; {new Date().getFullYear()} Banana Shop
            <h3 className="">welcome to the banana shop🍌</h3>
          </footer>
        </div>
      </body>
    </html>
  );
}
