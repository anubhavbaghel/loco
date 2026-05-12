'use client'
import { Heart, House, Search, User } from "lucide-react";

const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 max-h-3 flex justify-center bg-black item-center text-2xl py-2 px-5 min-w-full">
      <div className=" text-green-600 px-3 py-1 rounded-2xl z-10 hover:text-white cursor-pointer item-center flex flex-col">
        <House />
        Home
      </div>
      <div className=" text-green-600 px-3 py-1 rounded-2xl z-10 hover:text-white cursor-pointer item-center flex flex-col">
        <Search />
        Explore
      </div>
      <div className=" text-green-600 px-3 py-1 rounded-2xl z-10 hover:text-white cursor-pointer item-center flex flex-col">
        <Heart />
        Saved
      </div>
      <div className=" text-green-600 px-3 py-1 rounded-2xl z-10 hover:text-white cursor-pointer item-center flex flex-col">
        <User />
        Profile
      </div>
    </div>
  );
};

export default BottomNavBar;
