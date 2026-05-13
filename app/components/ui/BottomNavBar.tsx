'use client'
import { Heart, House, Search, User } from "lucide-react";
import "./BottomNavBar.css"

const BottomNavBar = () => {
  return (
    <div className="navbar fixed bottom-0 flex justify-evenly px-3 py-1 bg-black item-center text-2xl  w-fit rounded-4xl mb-2 mx-1">
      <div className=" text-green-600 px-3 py-1 rounded-2xl z-10 hover:text-white cursor-pointer flex flex-col items-center">
        <House className="nav-icons"/>
        <p>Home</p>
      </div>
      <div className=" text-green-600 px-3 py-1 rounded-2xl z-10 hover:text-white cursor-pointer flex flex-col items-center">
        <Search className="nav-icons"/>
        <p>Explore</p>
      </div>
      <div className=" text-green-600 px-3 py-1 rounded-2xl z-10 hover:text-white cursor-pointer flex flex-col items-center">
        <Heart className="nav-icons"/>
        <p>Saved</p>
      </div>
      <div className=" text-green-600 px-3 py-1 rounded-2xl z-10 hover:text-white cursor-pointer flex flex-col items-center">
        <User className="nav-icons"/>
        <p>Profile</p>
      </div>
    </div>
  );
};

export default BottomNavBar;
