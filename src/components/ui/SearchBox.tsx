"use client";

import { useEffect, useId, useRef } from "react";
import { submitForm } from "@/lib/submit-form";
import { SearchIcon } from "@/components/icons";

export default function SearchBox({ defaultValue }: { defaultValue: string }) {
  const labelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const input = inputRef.current;
    if (input && document.activeElement !== input) {
      input.value = defaultValue;
    }
  }, [defaultValue]);

  return (
    <div className="relative h-10 w-full lg:w-[250px]">
      <label htmlFor={labelId} className="sr-only">
        Search tests
      </label>
      <button
        type="submit"
        aria-label="Search"
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center text-muted"
      >
        <SearchIcon className="h-4 w-4" />
      </button>
      <input
        ref={inputRef}
        id={labelId}
        name="q"
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        defaultValue={defaultValue}
        placeholder="Search Tests"
        className="h-10 w-full scroll-mt-24 rounded-lg border border-line bg-white pl-10 pr-3 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:text-sm"
        onChange={(e) => {
          const form = e.currentTarget.form;
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
          timerRef.current = setTimeout(() => {
            submitForm(form);
          }, 300);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }
            submitForm(e.currentTarget.form);
          }
        }}
      />
    </div>
  );
}
