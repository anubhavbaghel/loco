"use client";
import { useState } from "react";
import "./vibe-selection.css";
import Link from "next/link";
import { PreferenceItem, usePreferenceStore } from "../../store/globalStore";
import { useRouter } from "next/navigation";

export default function VibesSelection() {
  const router = useRouter();

  const [selectedItems, setSelectedItems] = useState<PreferenceItem[]>([]);
  const setPreferenceItems = usePreferenceStore(
    (state) => state.setPreferenceStore,
  );

  const handleClick = (input: string) => {
    const exists = selectedItems.find((item) => item.item === input);

    if (exists) {
      console.log("removed");
      const newSelectedItems = selectedItems.filter(
        (item) => item.item !== input,
      );
      setSelectedItems(newSelectedItems);
    } else {
      console.log("added");
      console.log(selectedItems);
      setSelectedItems((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          item: input,
        },
      ]);
    }
  };

  const handleSubmit = (selectedItems: PreferenceItem[]) => {
    setPreferenceItems(selectedItems);
    router.push("/main/home");
  };

  const categories = [
    {
      id: "events",
      label: "Events",
      image: "/vibe-selection-vectors/celebration-vector.png",
    },
    {
      id: "places",
      label: "Places",
      image: "/vibe-selection-vectors/celebration-vector.png",
    },
    {
      id: "markets",
      label: "Markets",
      image: "/vibe-selection-vectors/celebration-vector.png",
    },
    {
      id: "food",
      label: "Food",
      image: "/vibe-selection-vectors/celebration-vector.png",
    },
    {
      id: "music",
      label: "Music",
      image: "/vibe-selection-vectors/celebration-vector.png",
    },
    {
      id: "art-culture",
      label: "Art & Culture",
      image: "/vibe-selection-vectors/celebration-vector.png",
    },
    {
      id: "outdoor",
      label: "Outdoor",
      image: "/vibe-selection-vectors/celebration-vector.png",
    },
    {
      id: "nightlife",
      label: "Nightlife",
      image: "/vibe-selection-vectors/celebration-vector.png",
    },
  ];

  return (
    <div className="flex flex-col vibe-selection-container gap-5 h-full justify-center">
      <div className="flex justify-between items-center">
        <Link href="/">
          <button className="bg-black rounded-full py-2 px-3 text-white">
            Back
          </button>
        </Link>
        <p className="border border-black rounded-full py-2 px-3 text-black">
          Skip
        </p>
      </div>
      <div>
        <h3 className="">
          Find what <br /> makes your <br /> weekend{" "}
        </h3>
        <h3 className="text-green-400">Awesome ! </h3>
      </div>

      <p className="text-gray-400">
        Pick your vibe. We&apos;ll personalize loco for you.
      </p>
      <div className="grid grid-cols-4 grid-rows-2 vibe-selection-grid gap-2">
        {categories.map((item) => (
          <button
            key={item.id}
            value={item.label}
            onClick={(e) => {
              handleClick(e.currentTarget.value);
              console.log(item);
            }}
            className={` text-white rounded-3xl px-3 py-2 box-border bg-green-400 ${selectedItems.find((selectedItem) => selectedItem.item === item.label) ? "border-2 border-black" : "border-2 border-white"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <button
        className="rounded-4xl border-2 border-green-700 px-10 py-3 w-full self-center-safe text-2xl cursor-pointer"
        onClick={() => {
          handleSubmit(selectedItems);
        }}
        disabled={selectedItems.length === 0}
      >
        Continue
      </button>
      {selectedItems.length === 0 && (
        <p className="text-center">Select atleast one vibe</p>
      )}
    </div>
  );
}
