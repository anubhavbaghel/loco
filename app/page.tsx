"use client";
import { usePreferenceStore } from "./store/globalStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const preferenceItems = usePreferenceStore((state) => state.preferenceStore);
  const hasHydrated = usePreferenceStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (hasHydrated) {
      router.push("/home");
    } else {
      router.push("/onboarding/");
    }
  }, [hasHydrated, preferenceItems.length, router]);

  return null;
}
