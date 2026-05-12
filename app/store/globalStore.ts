"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PreferenceItem = {
  id: number;
  item: string;
};

type PreferenceState = {
  preferenceStore: PreferenceItem[];
  hasHydrated: boolean;
  setPreferenceStore: (input: PreferenceItem[]) => void;
  setHasHydrated: (input: boolean) => void;
};

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set) => ({
      preferenceStore: [],
      hasHydrated: false,
      setPreferenceStore: (input) => set({ preferenceStore: input }),
      setHasHydrated: (input) => set({ hasHydrated: input }),
    }),
    {
      name: "preference-store",
      partialize: (state) => ({ preferenceStore: state.preferenceStore }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
