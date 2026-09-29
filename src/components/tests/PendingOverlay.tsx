"use client";

import { useLinkStatus } from "next/link";

export default function PendingOverlay() {
  const { pending } = useLinkStatus();

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-white/60 transition-opacity ${
        pending ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="h-4 w-4 animate-spin rounded-full border-[1.5px] border-brand border-t-transparent" />
    </span>
  );
}
