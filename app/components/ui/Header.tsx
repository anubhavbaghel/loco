"use client";

import { Bell, MapPin, Sparkles } from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";

const Header = () => {
  const [selectedCity, setSelectedCity] = useState("Bengaluru");
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    <header className="flex justify-between px-4 py-4 items-center w-full sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <Logo width={100} />
        <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-2 py-0.5 rounded-full shadow-xs">
          <Sparkles className="w-2.5 h-2.5" /> LIVE
        </span>
      </div>

      <div className="flex items-center gap-2.5">
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
      </div>
    </header>
  );
};

export default Header;

