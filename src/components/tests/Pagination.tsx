import Link from "next/link";
import { buildQuery, type Filters } from "@/lib/tests";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

const BOX =
  "flex h-10 short:h-9 w-[45px] items-center justify-center rounded-lg border border-line text-sm";

function pageItems(current: number, totalPages: number): (number | "gap")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: (number | "gap")[] = [1];
  const from = Math.max(2, current - 1);
  const to = Math.min(totalPages - 1, current + 1);

  if (from > 2) {
    items.push("gap");
  }
  for (let page = from; page <= to; page++) {
    items.push(page);
  }
  if (to < totalPages - 1) {
    items.push("gap");
  }
  items.push(totalPages);

  return items;
}

export default function Pagination({
  filters,
  current,
  totalPages,
}: {
  filters: Filters;
  current: number;
  totalPages: number;
}) {
  const href = (page: number) => `/${buildQuery(filters, { page })}`;

  return (
    <nav aria-label="Pagination" className="w-full sm:w-auto">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {current > 1 ? (
            <Link
              href={href(current - 1)}
              prefetch={false}
              aria-label="Previous page"
              className={`${BOX} bg-white text-ink`}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Link>
          ) : (
            <span
              role="link"
              aria-disabled="true"
              aria-label="Previous page"
              className={`${BOX} bg-white text-faint`}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </span>
          )}
        </li>

        <li className="px-2 text-sm text-muted sm:hidden">
          Page {current} of {totalPages}
        </li>

        {pageItems(current, totalPages).map((item, index) =>
          item === "gap" ? (
            <li
              key={`gap-${index}`}
              aria-hidden="true"
              className="hidden h-10 short:h-9 w-6 items-center justify-center text-sm text-muted sm:flex"
            >
              …
            </li>
          ) : (
            <li key={item} className="hidden sm:block">
              <Link
                href={href(item)}
                prefetch={false}
                aria-current={item === current ? "page" : undefined}
                className={`${BOX} ${
                  item === current
                    ? "border-brand bg-brand text-white"
                    : "bg-white text-ink"
                }`}
              >
                {item}
              </Link>
            </li>
          ),
        )}

        <li>
          {current < totalPages ? (
            <Link
              href={href(current + 1)}
              prefetch={false}
              aria-label="Next page"
              className={`${BOX} bg-white text-ink`}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Link>
          ) : (
            <span
              role="link"
              aria-disabled="true"
              aria-label="Next page"
              className={`${BOX} bg-white text-faint`}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
