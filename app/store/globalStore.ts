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

export type Coords = { lat: number; lng: number };

type LocationState = {
  coords: Coords | null;
  label: string | null;
  city: string;
  radiusKm: number;
  source: "gps" | "search" | "default";
  hasHydrated: boolean;
  setLocation: (input: {
    coords: Coords;
    label: string;
    city?: string;
    source?: "gps" | "search";
  }) => void;
  setRadius: (km: number) => void;
  setCity: (city: string) => void;
  clearLocation: () => void;
  setHasHydrated: (input: boolean) => void;
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      coords: null,
      label: null,
      city: "Delhi",
      radiusKm: 15,
      source: "default",
      hasHydrated: false,
      setLocation: ({ coords, label, city, source }) =>
        set({
          coords,
          label,
          ...(city ? { city } : {}),
          source: source ?? "search",
        }),
      setRadius: (km) => set({ radiusKm: km }),
      setCity: (city) => set({ city }),
      clearLocation: () =>
        set({ coords: null, label: null, source: "default" }),
      setHasHydrated: (input) => set({ hasHydrated: input }),
    }),
    {
      name: "loco-location",
      partialize: (state) => ({
        coords: state.coords,
        label: state.label,
        city: state.city,
        radiusKm: state.radiusKm,
        source: state.source,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

type SavedState = {
  ids: string[];
  hasHydrated: boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useSavedStore = create<SavedState>()(
  persist(
    (set, get) => ({
      ids: [],
      hasHydrated: false,
      toggle: (id) => {
        const ids = get().ids;
        set({ ids: ids.includes(id) ? ids.filter((x) => x !== id) : [id, ...ids] });
      },
      remove: (id) => set({ ids: get().ids.filter((x) => x !== id) }),
      clear: () => set({ ids: [] }),
    }),
    {
      name: "loco-saved",
      partialize: (state) => ({ ids: state.ids }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    },
  ),
);

export function useIsSaved(id: string): boolean {
  return useSavedStore((state) => state.ids.includes(id));
}
