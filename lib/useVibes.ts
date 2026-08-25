"use client";

import { useEffect, useState } from "react";
import { VibeItem, MOCK_VIBES } from "./mockData";

export function useVibes(city?: string, category?: string) {
  const [vibes, setVibes] = useState<VibeItem[]>(MOCK_VIBES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchVibes() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (city) params.append("city", city);
        if (category) params.append("category", category);

        const res = await fetch(`/api/events?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setVibes(data);
          } else {
            setVibes(MOCK_VIBES);
          }
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error fetching vibes");
          setVibes(MOCK_VIBES);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchVibes();

    return () => {
      isMounted = false;
    };
  }, [city, category]);

  return { vibes, loading, error };
}
