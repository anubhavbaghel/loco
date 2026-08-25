"use client";

import { useState } from "react";
import Header from "@/app/components/ui/Header";
import { Award, MapPin, Bell, ShieldCheck, Moon, LogOut, ChevronRight, Sparkles } from "lucide-react";

const ProfilePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const achievements = [
    { title: "Vibe Explorer", icon: "🌟", color: "bg-amber-100 text-amber-800" },
    { title: "Night Owl", icon: "🌙", color: "bg-purple-100 text-purple-800" },
    { title: "Foodie", icon: "🍕", color: "bg-rose-100 text-rose-800" },
    { title: "Market Scout", icon: "🛍️", color: "bg-emerald-100 text-emerald-800" },
  ];

  const userPreferences = ["Music", "Nightlife", "Markets", "Food", "Art & Culture"];

  return (
    <div className="flex flex-1 flex-col w-full min-h-screen bg-gradient-to-b from-violet-50/40 via-white to-gray-50 pb-28">
      <Header />

      {/* Profile Banner & Info */}
      <section className="px-4 pt-4 pb-2 flex flex-col items-center text-center">
        {/* Avatar Ring */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-violet-600 via-indigo-500 to-pink-500 p-1 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Anubhav Baghel"
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
          <span className="absolute bottom-1 right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white" />
        </div>

        <h1 className="font-black text-2xl text-gray-900 tracking-tight">Anubhav Baghel</h1>
        <p className="text-xs font-semibold text-violet-600 mb-1">@anubhav_loco • Bengaluru</p>
        <p className="text-xs text-gray-500 max-w-xs leading-relaxed font-medium">
          Chasing live concerts, rooftop techno sets & indie flea markets across BLR 🎸✨
        </p>

        {/* User Stats Strip */}
        <div className="flex justify-around items-center w-full max-w-xs bg-white p-3.5 rounded-2xl shadow-xs border border-gray-100 mt-4">
          <div className="flex flex-col items-center">
            <span className="font-black text-lg text-gray-900">14</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Attended</span>
          </div>
          <div className="w-px h-7 bg-gray-200" />
          <div className="flex flex-col items-center">
            <span className="font-black text-lg text-violet-600">8</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Saved</span>
          </div>
          <div className="w-px h-7 bg-gray-200" />
          <div className="flex flex-col items-center">
            <span className="font-black text-lg text-gray-900">5</span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Reviews</span>
          </div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="px-4 py-3">
        <h3 className="font-extrabold text-sm text-gray-900 mb-2 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Vibe Achievements</span>
        </h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {achievements.map((badge) => (
            <div
              key={badge.title}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 ${badge.color}`}
            >
              <span>{badge.icon}</span>
              <span>{badge.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Preferences Section */}
      <section className="px-4 py-2">
        <h3 className="font-extrabold text-sm text-gray-900 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-violet-500" />
          <span>Your Vibe Preferences</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {userPreferences.map((pref) => (
            <span
              key={pref}
              className="bg-violet-50 text-violet-700 border border-violet-200 px-3 py-1 rounded-full text-xs font-bold"
            >
              #{pref}
            </span>
          ))}
        </div>
      </section>

      {/* Settings & Controls */}
      <section className="px-4 py-3">
        <h3 className="font-extrabold text-sm text-gray-900 mb-2">Account & Settings</h3>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs divide-y divide-gray-100 overflow-hidden">
          {/* Location */}
          <div className="flex items-center justify-between p-3.5 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-bold text-gray-800">Primary Location</span>
            </div>
            <span className="text-xs font-semibold text-gray-500">Bengaluru, IN</span>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-3.5">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-violet-500" />
              <span className="text-xs font-bold text-gray-800">Event Notifications</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                notifications ? "bg-violet-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between p-3.5">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-bold text-gray-800">Dark Mode (Beta)</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                darkMode ? "bg-violet-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                  darkMode ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Security & Privacy */}
          <div className="flex items-center justify-between p-3.5 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-gray-800">Privacy & Terms</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          {/* Logout */}
          <div
            onClick={() => alert("Logged out successfully!")}
            className="flex items-center justify-between p-3.5 hover:bg-rose-50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-bold text-rose-600">Sign Out</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
