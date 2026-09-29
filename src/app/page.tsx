import PageHeader from "@/components/tests/PageHeader";
import FilterBar from "@/components/tests/FilterBar";
import TestsTable from "@/components/tests/TestsTable";
import { getTests } from "@/lib/tests-source";
import { getClassOptions, parseFilters, toTestRows } from "@/lib/tests";

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

  return (
    <div className="flex flex-col gap-6">
      <PageHeader />
      <FilterBar filters={filters} classOptions={classOptions} />
      <TestsTable rows={rows.slice(0, 5)} />
    </div>
  );
}
