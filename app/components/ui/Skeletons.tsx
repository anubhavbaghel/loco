export function EventCardSkeleton() {
  return (
    <div className="w-full min-w-[260px] animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white md:min-w-0">
      <div className="h-44 w-full bg-gray-100" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-3.5 w-4/5 rounded bg-gray-100" />
        <div className="h-3 w-2/3 rounded bg-gray-100" />
        <div className="h-3 w-1/2 rounded bg-gray-100" />
        <div className="mt-2 h-3 w-1/3 rounded bg-gray-100" />
      </div>
    </div>
  );
}

export function SectionSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-sm text-gray-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-accent" />
      {label}
    </div>
  );
}
