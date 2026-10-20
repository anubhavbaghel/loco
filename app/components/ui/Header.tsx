"use client";

import { House, MapPin, Search, Heart, User, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LocationDialog from "./LocationDialog";
import { useLocationStore } from "@/app/store/globalStore";

const Header = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const pathname = usePathname();

  const label = useLocationStore((state) => state.label);
  const city = useLocationStore((state) => state.city);
  const hasHydrated = useLocationStore((state) => state.hasHydrated);

  const navItems = [
    { label: "Home", href: "/home", icon: House },
    { label: "Explore", href: "/explore", icon: Search },
    { label: "Saved", href: "/saved", icon: Heart },
    { label: "Profile", href: "/profile", icon: User },
  ];

  const place = hasHydrated ? (label ?? city) : city;

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/home" className="shrink-0" aria-label="Loco home">
              <Logo width={92} />
            </Link>

            <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || (item.href === "/home" && pathname === "/");

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "bg-accent-soft font-medium text-accent"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDialogOpen(true)}
              className="flex max-w-[42vw] items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm text-gray-700 transition-colors hover:border-gray-300"
              aria-label="Change location"
            >
              <MapPin className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span className="truncate font-medium">{place}</span>
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            </button>

            <Link href="/profile" className="hidden md:block" aria-label="Profile">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Profile"
                className="h-8 w-8 rounded-full border border-gray-200 object-cover"
              />
            </Link>
          </div>
        </div>
      </header>

      <LocationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default Header;
