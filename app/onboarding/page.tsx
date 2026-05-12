'use client';

import Link from "next/link";

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      {/* Logo */}
      <h1 className="text-center font-bold">Loco</h1>
      <ul className="text-center text-3xl font-semibold">
        <li className="text-pink-600">Your City</li>
        <li className="text-green-600">Your Vibe</li>
        <li className="text-cyan-600">Your Loco</li>
      </ul>
      <p className="text-center w-full md:w-[60%] text-gray-500">
        Discover exciting events, iconic places , local markets and hidden gems
        around you
      </p>
      {/* <img src="" alt="" /> */}
      <Link href="/vibes-selection">
        <button className="rounded-4xl text-green-600 border-2 border-green-700 px-10 py-3 w-full self-center-safe text-2xl cursor-pointer hover:text-white hover:bg-green-600">
          Let's Loco!
        </button>
        </Link>
      <p className="text-black border border-black rounded-4xl py-2 px-6 hover:bg-black hover:text-white">Skip</p>
    </div>
  );
};

export default WelcomeScreen;
