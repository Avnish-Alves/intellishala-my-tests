import MyTestsView from "@/components/tests/MyTestsView";
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

  return (
    <MyTestsView
      totalCount={rows.length}
      items={items}
      filteredCount={filtered.length}
      start={start}
      end={end}
      totalPages={totalPages}
      current={current}
      classOptions={classOptions}
      filters={filters}
    />
  );
}
