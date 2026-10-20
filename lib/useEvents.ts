"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocationStore } from "@/app/store/globalStore";
import type { EventDTO } from "@/lib/events/types";

export interface UseEventsOptions {
  q?: string;
  category?: string;
  city?: string;
  free?: boolean;
  radiusKm?: number;
  limit?: number;
  sort?: "distance" | "date" | "price";
  ids?: string[];
  enabled?: boolean;
  dateFrom?: string;
  dateTo?: string;
}

interface UseEventsResult {
  events: EventDTO[];
  loading: boolean;
  error: string | null;
  degraded: boolean;
  refetch: () => void;
}

export function useEvents(options: UseEventsOptions = {}): UseEventsResult {
  const coords = useLocationStore((state) => state.coords);
  const storeRadius = useLocationStore((state) => state.radiusKm);
  const storeCity = useLocationStore((state) => state.city);

  const [events, setEvents] = useState<EventDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [degraded, setDegraded] = useState(false);
  const [nonce, setNonce] = useState(0);

  const {
    q,
    category,
    city = storeCity,
    free,
    radiusKm = storeRadius,
    limit = 60,
    sort,
    ids,
    enabled = true,
    dateFrom,
    dateTo,
  } = options;

  const params = useMemo(() => {
    const search = new URLSearchParams();
    if (q) search.set("q", q);
    if (category) search.set("category", category);
    if (ids && ids.length) {
      search.set("ids", ids.join(","));
    } else {
      if (city) search.set("city", city);
      if (coords) {
        search.set("lat", String(coords.lat));
        search.set("lng", String(coords.lng));
        search.set("radiusKm", String(radiusKm));
      }
      if (free) search.set("free", "true");
      if (sort) search.set("sort", sort);
      if (dateFrom) search.set("dateFrom", dateFrom);
      if (dateTo) search.set("dateTo", dateTo);
    }
    search.set("limit", String(limit));
    return search.toString();
  }, [
    q,
    category,
    city,
    coords,
    radiusKm,
    free,
    sort,
    ids,
    dateFrom,
    dateTo,
    limit,
  ]);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    let active = true;

    async function run() {
      setLoading(true);
      try {
        const res = await fetch(`/api/events?${params}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = (await res.json()) as {
          events: EventDTO[];
          degraded?: boolean;
        };
        if (!active) return;
        setEvents(data.events ?? []);
        setDegraded(Boolean(data.degraded));
        setError(null);
      } catch (err) {
        if (!active || (err as Error).name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        if (active) setLoading(false);
      }
    }

    run();
    return () => {
      active = false;
      controller.abort();
    };
  }, [params, enabled, nonce]);

  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  return {
    events,
    loading: enabled && loading,
    error,
    degraded,
    refetch,
  };
}
