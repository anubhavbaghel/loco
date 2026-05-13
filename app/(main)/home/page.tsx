"use client";

import EventsSection from "@/app/components/ui/EventsSection";
import { usePreferenceStore } from "../../store/globalStore";
import "./homepage.css";
import Header from "@/app/components/ui/Header";

const Homepage = () => {
  const preferenceItems = usePreferenceStore((state) => state.preferenceStore);

  console.log(preferenceItems);
  const deafultItems = [
    { id: 1, item: "Events" },
    { id: 2, item: "Places" },
    { id: 3, item: "Markets" },
    { id: 4, item: "For you" },
    { id: 5, item: "Concerts" },
    { id: 6, item: "Parks" },
  ];

  const Categories = () => {
    return (
      <div className="flex px-2 scroll-container-categories shrink-0">
        {deafultItems.map((item: { id: number; item: string }) => (
          <button
            value={item.item}
            key={item.id}
            onClick={() => console.log("clicked")}
            className="scroll-item border py-2 px-3 bg-green-400 rounded-full border-green-400 hover:border-black hover:bg-black hover:text-green-600 font-semibold shadow-sm"
          >
            {item.item}
          </button>
        ))}
      </div>
    );
  };

  const UserGreeting = () => {
    return (
      <div className="px-5">
        <h2>Hi, User!</h2>
        <p>Ready to explore today?</p>
      </div>
    );
  };

  const SearchBar = () => {
    return (
      <input
        type="text"
        placeholder="Search events, places, markets..."
        className="border-gray-400 border rounded-full py-2 px-3 mx-2"
      />
    );
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-2 w-full h-full overflow-visible">
        <Header/>
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
