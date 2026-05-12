"use client";

import { usePreferenceStore } from "../../store/globalStore";

const Homepage = () => {
  const preferenceItems = usePreferenceStore(
    (state) => state.preferenceStore,
  );

  console.log(preferenceItems);
  const deafultItems = [
    { id: 1, item: "events" },
    { id: 2, item: "places" },
    { id: 3, item: "markets" },
    { id: 4, item: "For you" },
  ];

  return (
    <>
      <div className="flex flex-col gap-5 w-[90%] h-full">
        <div>
          <h2>Hi, User!</h2>
          <p>Ready to explore today?</p>
        </div>
        <input
          type="text"
          placeholder="Search events, places, markets..."
          className="border-gray-400 border rounded-full py-2 px-3"
        />
        <div className="grid grid-cols-4 gap-2 ">
          {preferenceItems.length >= 4
            ? preferenceItems
                .slice(0, 4)
                .map((preferenceItem: { id: number; item: string }) => (
                  <button
                    value={preferenceItem.item}
                    key={preferenceItem.id}
                    onClick={() => console.log("clicked")}
                    className="border py-2 px-3 bg-green-400 rounded-full border-green-400 hover:bg-amber-300"
                  >
                    {preferenceItem.item}
                  </button>
                ))
            : deafultItems.map((item: { id: number; item: string }) => (
                <button
                  value={item.item}
                  key={item.id}
                  onClick={() => console.log("clicked")}
                  className="border py-2 px-3 bg-green-400 rounded-full border-green-400 hover:bg-amber-300"
                >
                  {item.item}
                </button>
              ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
