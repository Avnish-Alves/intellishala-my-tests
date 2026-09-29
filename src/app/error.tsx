"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4 py-32 text-center">
      <h2 className="text-xl font-semibold text-ink">
        Couldn&apos;t load your tests
      </h2>
      <button
        onClick={() => retry()}
        className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white"
      >
        Try again
      </button>
    </div>
  );
}
