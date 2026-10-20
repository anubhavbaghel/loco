export function istDateKey(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export function todayKey(): string {
  return istDateKey(new Date().toISOString());
}

export function isToday(iso: string): boolean {
  return istDateKey(iso) === todayKey();
}

export function isWeekend(iso: string): boolean {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
  }).format(new Date(iso));
  return weekday === "Sat" || weekday === "Sun";
}

export function isUpcoming(iso: string): boolean {
  return istDateKey(iso) >= todayKey();
}

export function withinDays(iso: string, days: number): boolean {
  const target = new Date(iso).getTime();
  const diff = target - Date.now();
  return diff <= days * 24 * 60 * 60 * 1000;
}
