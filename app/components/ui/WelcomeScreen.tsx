"use client";

import Link from "next/link";

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen gap-2">
      {/* Logo */}
      <div className="flex flex-col items-start max-w-[55%] gap-8">
        <img src="/assets/logo.png" className="md:max-w-[50%]" alt="logo" />
        <ul className="text-left text-3xl font-bold">
          <li className="text-violet-950">Your City.</li>
          <li className="text-rose-400">Your Vibe.</li>
          <li className="text-indigo-700">Your Loco.</li>
        </ul>
        <p className="text-left md:w-[60%] text-gray-500 font-semibold">
          Discover exciting events, iconic places , local markets and hidden
          gems around you
        </p>
      </div>
      <img src="/assets/welcome-page.png" className="h-[40%]" alt="" />
      <Link href="/">
        <button className="rounded-4xl text-white border border-white bg-violet-900 px-10 py-2 w-full self-center-safe text-2xl cursor-pointer hover:text-violet-900 hover:bg-white hover:border hover:border-violet-900">
          Let&apos;s Loco!
        </button>
      </Link>
    </div>
  );
};

export default WelcomeScreen;
