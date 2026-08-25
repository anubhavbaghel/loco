'use client';
import { Heart, House, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./BottomNavBar.css";

const BottomNavBar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/home", icon: House },
    { label: "Explore", href: "/explore", icon: Search },
    { label: "Saved", href: "/saved", icon: Heart },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav aria-label="Main Navigation" className="navbar fixed bottom-3 z-50 flex md:hidden justify-between items-center px-3 py-2 bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl w-[92%] max-w-[480px] rounded-full transition-all duration-300">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href === "/home" && pathname === "/");

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md scale-105"
                : "text-gray-500 hover:text-violet-600 hover:bg-violet-50"
            }`}
          >
            <Icon className={`w-5 h-5 transition-transform ${isActive ? "scale-110" : ""}`} />
            <span className="text-[11px] font-semibold tracking-wide mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;

