import { create } from 'zustand'

export const usePreferenceStore = create((set) => ({
  preferenceStore: <{
    id: number | null;
    item: string;
  }[]>([]),
  setPreferenceStore: (input: {
    id: number | null;
    item: string;
  }[]) => set({ preferenceStore: input }),
}))