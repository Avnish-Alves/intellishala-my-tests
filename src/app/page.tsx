import PageHeader from "@/components/tests/PageHeader";
import FilterBar from "@/components/tests/FilterBar";
import TestsTable from "@/components/tests/TestsTable";
import Pagination from "@/components/tests/Pagination";
import { getTests } from "@/lib/tests-source";
import {
  PAGE_SIZE,
  filterTests,
  getClassOptions,
  paginate,
  parseFilters,
  toTestRows,
} from "@/lib/tests";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const rows = toTestRows(await getTests());
  const classOptions = getClassOptions(rows);
  const filters = parseFilters(
    await searchParams,
    classOptions.map((o) => o.value),
  );
  const filtered = filterTests(rows, filters);
  const { items, start, end, totalPages, current } = paginate(
    filtered,
    filters.page,
    PAGE_SIZE,
  );
  const n = filtered.length;

  return (
    <>
      <PageHeader />

      <section
        aria-labelledby="tests-heading"
        className="mt-6 rounded-3xl bg-white p-4 sm:p-6"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <h2 id="tests-heading" className="text-xl font-semibold text-ink">
              My Tests
            </h2>
            <span className="rounded-md bg-brand-soft px-2 py-1 text-[10px] font-medium text-brand">
              {rows.length} {rows.length === 1 ? "Test" : "Tests"}
            </span>
          </div>
          <FilterBar filters={filters} classOptions={classOptions} />
        </div>

        <TestsTable rows={items} />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p role="status" className="text-sm text-muted">
            Showing {start} to {end} of {n} {n === 1 ? "test" : "tests"}
          </p>
          <Pagination
            filters={filters}
            current={current}
            totalPages={totalPages}
          />
        </div>
      </section>
    </>
  );
}
