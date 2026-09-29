import MyTestsView from "@/components/tests/MyTestsView";
import { DEFAULT_FILTERS } from "@/lib/tests";

export default function EmptyPage() {
  return (
    <MyTestsView
      totalCount={0}
      items={[]}
      filteredCount={0}
      start={0}
      end={0}
      totalPages={1}
      current={1}
      filters={DEFAULT_FILTERS}
      classOptions={[]}
    />
  );
}
