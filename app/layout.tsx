import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";

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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${nunitoSans.variable} ${geistMono.variable} h-full antialiased flex-col items-center flex`}
    >
      <body className="min-h-screen flex flex-col items-center w-full bg-gray-50/50 text-gray-900 selection:bg-violet-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
