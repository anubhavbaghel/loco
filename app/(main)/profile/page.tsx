"use client";

import { useState } from "react";
import Header from "@/app/components/ui/Header";
import { Bell, LogOut, MapPin, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
  const [notifications, setNotifications] = useState(true);

  const interests = ["Music", "Nightlife", "Markets", "Food", "Art & Culture"];

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col bg-gray-50 pb-24 md:pb-10">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
          {/* Profile + interests */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <section className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Anubhav Baghel"
                  className="h-16 w-16 rounded-full border border-gray-200 object-cover"
                />
                <div>
                  <h1 className="text-lg font-semibold tracking-tight text-gray-900">
                    Anubhav Baghel
                  </h1>
                  <p className="text-sm text-gray-500">@anubhav · Bengaluru</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">
                Chasing live music, markets and food pop-ups across Bengaluru.
              </p>

              <div className="grid grid-cols-3 divide-x divide-gray-100 rounded-lg border border-gray-100 bg-gray-50 py-3">
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold text-gray-900">14</span>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                    Attended
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold text-accent">8</span>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                    Saved
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-base font-semibold text-gray-900">5</span>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                    Reviews
                  </span>
                </div>
              </div>
            </section>

            <section className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Interests</h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Used to prioritize what you see.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Settings */}
          <div className="md:col-span-2">
            <section className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white px-5">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Primary location</span>
                </div>
                <span className="text-sm text-gray-500">Bengaluru, IN</span>
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Event notifications</span>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  role="switch"
                  aria-checked={notifications}
                  aria-label="Toggle event notifications"
                  className={`relative h-6 w-10 rounded-full p-0.5 transition-colors ${
                    notifications ? "bg-accent" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-white transition-transform ${
                      notifications ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex cursor-pointer items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Privacy & terms</span>
                </div>
                <span className="text-xs text-gray-400">Opens soon</span>
              </div>

              <div className="flex cursor-pointer items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <LogOut className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">Sign out</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
