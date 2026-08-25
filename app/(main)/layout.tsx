"use client";

import BottomNavBar from "../components/ui/BottomNavBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 w-full min-h-screen flex-col items-center justify-start">
      {children}
      <BottomNavBar />
    </div>
  );
}
