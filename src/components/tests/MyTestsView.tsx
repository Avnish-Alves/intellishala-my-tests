import PageHeader from "@/components/tests/PageHeader";
import FilterBar from "@/components/tests/FilterBar";
import TestsTable from "@/components/tests/TestsTable";
import TestsCardList from "@/components/tests/TestsCardList";
import Pagination from "@/components/tests/Pagination";
import EmptyState from "@/components/tests/EmptyState";
import { PAGE_SIZE, type ClassOption, type Filters, type TestRow } from "@/lib/tests";

export default function MyTestsView({
  totalCount,
  items,
  filteredCount,
  start,
  end,
  totalPages,
  current,
  classOptions,
  filters,
}: {
  totalCount: number;
  items: TestRow[];
  filteredCount: number;
  start: number;
  end: number;
  totalPages: number;
  current: number;
  classOptions: ClassOption[];
  filters: Filters;
}) {
  const hasTests = totalCount > 0;
  const hasMatches = filteredCount > 0;
  const classLabel =
    classOptions.find((option) => option.value === filters.classKey)?.label ??
    "";

  return (
    <>
      <PageHeader showCreate={hasTests} />

      <section
        aria-labelledby="tests-heading"
        className="mt-6 rounded-3xl bg-white p-4 sm:p-6 lg:flex lg:flex-1 lg:flex-col short:mt-4 short:py-4"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <h2 id="tests-heading" className="text-xl font-semibold text-ink">
              My Tests
            </h2>
            <span className="rounded-md bg-brand-soft px-1.5 py-1 text-[10px] font-medium text-brand">
              {totalCount} {totalCount === 1 ? "Test" : "Tests"}
            </span>
          </div>
          {hasTests && (
            <FilterBar filters={filters} classOptions={classOptions} />
          )}
        </div>

        {!hasTests && <EmptyState variant="no-tests" />}

        {hasTests && !hasMatches && (
          <EmptyState
            variant="no-matches"
            query={filters.query}
            classLabel={classLabel}
            status={filters.status}
          />
        )}

        {hasTests && hasMatches && (
          <>
            <TestsTable rows={items} fill={items.length === PAGE_SIZE} />
            <TestsCardList rows={items} />

            <div className="mt-6 flex flex-col gap-4 short:mt-4 sm:flex-row sm:items-center sm:justify-between">
              <p role="status" className="text-sm text-muted">
                Showing {start} to {end} of {filteredCount}{" "}
                {filteredCount === 1 ? "test" : "tests"}
              </p>
              <Pagination
                filters={filters}
                current={current}
                totalPages={totalPages}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}
