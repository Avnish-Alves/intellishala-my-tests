"use client";

import { useEffect, useId, useRef } from "react";
import { submitForm } from "@/lib/submit-form";
import { ChevronDownIcon } from "@/components/icons";

export default function AutoSubmitSelect({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue: string;
  options: { value: string; label: string }[];
}) {
  const labelId = useId();
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const select = selectRef.current;
    if (select) {
      select.value = defaultValue;
    }
  }, [defaultValue]);

  return (
    <div className="relative h-10 w-full lg:w-40">
      <label htmlFor={labelId} className="sr-only">
        {label}
      </label>
      <select
        ref={selectRef}
        id={labelId}
        name={name}
        defaultValue={defaultValue}
        onChange={(e) => submitForm(e.currentTarget.form)}
        className="h-10 w-full appearance-none rounded-lg border border-line pl-3 pr-9 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}
