"use client";

import BottomNavBar from "../components/ui/BottomNavBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center md:max-w-[50%]">
      {children}
      <BottomNavBar />
    </div>
  );
}
