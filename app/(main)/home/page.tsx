"use client";

import EventsSection from "@/app/components/ui/EventsSection";
import { usePreferenceStore } from "../../store/globalStore";
import "./homepage.css";
import Header from "@/app/components/ui/Header";

const Homepage = () => {
  const preferenceItems = usePreferenceStore((state) => state.preferenceStore);
  const hour = new Date().getHours();

  console.log(preferenceItems);
  const deafultItems = [
    { id: 1, item: "Events" ,link:"/assets/events.avif" ,alt:"Events" ,bg:"bg-blue-200"},
    { id: 2, item: "Places" ,link:"/assets/places.avif" ,alt:"Places" ,bg:"bg-green-200"},
    { id: 3, item: "Markets" ,link:"/assets/markets.avif" ,alt:"Markets" ,bg:"bg-yellow-200"},
    { id: 4, item: "Food" ,link:"/assets/food.avif" ,alt:"Food" ,bg:"bg-red-200"},
    { id: 5, item: "Music" ,link:"/assets/music.avif" ,alt:"Music" ,bg:"bg-purple-200"},
    { id: 6, item: "Outdoor" ,link:"/assets/outdoor.avif" ,alt:"Outdoor" ,bg:"bg-teal-200"},
    { id: 7, item: "Nightlife" ,link:"/assets/nightlife.avif" ,alt:"Nightlife" ,bg:"bg-pink-200"},
    { id: 8, item: "Art-Culture" ,link:"/assets/art-culture.avif" ,alt:"Art-Culture" ,bg:"bg-indigo-200"},
  ];

  const Categories = () => {
    return (
      <div className="flex scroll-container-categories shrink-0 gap-5">
        {deafultItems.map((item: { id: number; item: string, link: string, alt: string, bg: string }) => (
          <button
            value={item.item}
            key={item.id}
            onClick={() => console.log("clicked")}
            className={`scroll-item shrink-0 flex flex-col items-center gap-1 text-sm`}
          >
            <img src={item.link} alt={item.alt} className={`rounded-full w-15 object-cover  ${item.bg}`}/>
            <p>{item.item}</p>
          </button>
        ))}
      </div>
    );
  };

  const UserGreeting = () => {
    return (
      <div className="px-3">
        {hour < 12 && <p className="font-bold text-2xl">Good morning!</p>}
        {hour < 17 && <p className="font-bold text-2xl">Good afternoon!</p>}
        {hour < 21 && <p className="font-bold text-2xl">Good evening!</p>}
        {hour > 21 && <p className="font-bold text-2xl">Good Night!</p>}
        <p className="font-semibold text-gray-600">What are you exploreing today?</p>
      </div>
    );
  };

  const SearchBar = () => {
    return (
      <input
        type="text"
        placeholder="Search events, places, markets..."
        className="border-none shadow-sm rounded-full py-2 px-3 mx-2"
      />
    );
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-2 w-full h-full overflow-visible">
        <Header />
        <UserGreeting />
        <SearchBar />
        <Categories />
        <EventsSection />
        <EventsSection />
        <EventsSection />
      </div>
    </>
  );
};

export default Homepage;
