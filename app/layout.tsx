"use client";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import BottomNavBar from "./components/ui/BottomNavBar";
import { usePreferenceStore } from "./store/globalStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const nunitoSans = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const preferenceItems = usePreferenceStore(
    (state: any) => state.preferenceStore,
  );
  return (
    <html
      lang="en"
      className={` h-full antialiased flex-col items-center flex`}
    >
      <body className="min-h-full flex flex-col items-center w-full md:max-w-[50%] justify-between">
        {children}
      </body>
    </html>
  );
}
