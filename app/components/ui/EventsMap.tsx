"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Link from "next/link";
import type { EventDTO } from "@/lib/events/types";
import { formatDistanceKm } from "@/lib/events/serialize";

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:9999px;background:#4440a9;border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

interface EventsMapProps {
  events: EventDTO[];
  center: { lat: number; lng: number };
}

export default function EventsMap({ events, center }: EventsMapProps) {
  const points = events.filter(
    (event) => event.lat != null && event.lng != null,
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={11}
        scrollWheelZoom
        style={{ height: 460, width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((event) => (
          <Marker key={event.id} position={[event.lat as number, event.lng as number]} icon={pinIcon}>
            <Popup>
              <div className="min-w-[180px]">
                <p className="text-xs font-semibold text-gray-900">{event.title}</p>
                <p className="mt-0.5 text-[11px] text-gray-500">
                  {event.date} · {event.time}
                </p>
                <p className="text-[11px] text-gray-500">{event.location}</p>
                {formatDistanceKm(event.distanceKm) && (
                  <p className="text-[11px] text-gray-500">
                    {formatDistanceKm(event.distanceKm)}
                  </p>
                )}
                <Link
                  href={`/home/event?id=${event.id}`}
                  className="mt-1 inline-block text-[11px] font-medium text-accent"
                >
                  View details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
