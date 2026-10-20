"use client";

import { Heart, House, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/home", icon: House },
    { label: "Explore", href: "/explore", icon: Search },
    { label: "Saved", href: "/saved", icon: Heart },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="grid grid-cols-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || (item.href === "/home" && pathname === "/");

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-2 text-[11px] transition-colors ${
                isActive ? "font-medium text-accent" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;
