"use client";

import { Bell, MapPin, Sparkles, House, Search, Heart, User } from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [selectedCity, setSelectedCity] = useState("Bengaluru");
  const [hasNotifications, setHasNotifications] = useState(true);
  const pathname = usePathname();

  const desktopNavItems = [
    { label: "Home", href: "/home", icon: House },
    { label: "Explore", href: "/explore", icon: Search },
    { label: "Saved", href: "/saved", icon: Heart },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <header className="flex justify-between items-center px-4 md:px-8 py-3.5 w-full sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        {/* Brand & Live Badge */}
        <div className="flex items-center gap-3">
          <Link href="/home" className="flex items-center gap-2">
            <Logo width={110} />
          </Link>
          <span className="hidden sm:flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-2.5 py-0.5 rounded-full shadow-xs">
            <Sparkles className="w-2.5 h-2.5" /> LIVE VIBES
          </span>
        </div>

        {/* Desktop Central Navigation Menu */}
        <nav aria-label="Desktop Navigation" className="hidden md:flex items-center gap-1 bg-gray-100/80 p-1.5 rounded-full border border-gray-200/60">
          {desktopNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === "/home" && pathname === "/");

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? "bg-white text-violet-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-violet-600" : "text-gray-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: City Selector, Notifications & Avatar */}
        <div className="flex items-center gap-3">
          {/* City Selection Pill */}
          <div className="flex items-center gap-1.5 bg-gray-100/90 hover:bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200/60 shadow-2xs transition-colors">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-800 outline-none cursor-pointer pr-1"
            >
              <option value="Bengaluru">Bengaluru</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Goa">Goa</option>
            </select>
          </div>

          {/* Notification Bell */}
          <button
            onClick={() => setHasNotifications(false)}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200/80 text-gray-700 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {hasNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
            )}
            {hasNotifications && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
            )}
          </button>

          {/* Desktop User Avatar Button */}
          <Link href="/profile" className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-200 hover:opacity-90 transition-opacity">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Anubhav Baghel"
              className="w-8 h-8 rounded-full object-cover border border-violet-500 shadow-xs"
            />
            <span className="text-xs font-bold text-gray-800 truncate max-w-[100px]">Anubhav</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;


