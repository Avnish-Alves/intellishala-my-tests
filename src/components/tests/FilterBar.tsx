import Form from "next/form";
import type { ClassOption, Filters } from "@/lib/tests";
import { TEST_STATUSES } from "@/lib/tests";
import SearchBox from "@/components/ui/SearchBox";
import AutoSubmitSelect from "@/components/ui/AutoSubmitSelect";

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  ...TEST_STATUSES.map((status) => ({ value: status, label: status })),
];

export default function FilterBar({
  filters,
  classOptions,
}: {
  filters: Filters;
  classOptions: ClassOption[];
}) {
  const classSelectOptions = [
    { value: "", label: "All Classes" },
    ...classOptions,
  ];

  return (
    <Form
      action=""
      replace
      className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-2.5"
    >
      <SearchBox defaultValue={filters.query} />
      <div className="grid grid-cols-2 gap-3 lg:contents">
        <AutoSubmitSelect
          name="class"
          label="Class"
          defaultValue={filters.classKey}
          options={classSelectOptions}
        />
        <AutoSubmitSelect
          name="status"
          label="Status"
          defaultValue={filters.status}
          options={STATUS_OPTIONS}
        />
      </div>
      <noscript>
        <button
          type="submit"
          className="h-10 rounded-lg bg-brand px-3 text-sm font-medium text-white"
        >
          Apply
        </button>
      </noscript>
    </Form>
  );
}
