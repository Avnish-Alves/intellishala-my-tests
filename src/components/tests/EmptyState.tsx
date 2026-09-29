import Link from "next/link";
import CreateTestLink from "@/components/tests/CreateTestLink";
import { MyTestsIcon } from "@/components/icons";

type EmptyStateProps =
  | { variant: "no-tests" }
  | { variant: "no-matches"; query: string; classLabel: string; status: string };

export default function EmptyState(props: EmptyStateProps) {
  if (props.variant === "no-tests") {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand">
          <MyTestsIcon className="h-6 w-6" />
        </span>
        <h3 className="text-lg font-semibold text-ink">No tests yet</h3>
        <p className="text-sm text-muted">
          Tests you create for your classes will show up here.
        </p>
        <div className="mt-1">
          <CreateTestLink />
        </div>
      </div>
    );
  }

  let description = "No results";
  if (props.query) {
    description += ` for "${props.query}"`;
  }
  if (props.classLabel) {
    description += ` in ${props.classLabel}`;
  }
  if (props.status) {
    description += props.query || props.classLabel ? `, ${props.status}` : ` for ${props.status}`;
  }

  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 px-4 py-16 text-center"
    >
      <h3 className="text-lg font-semibold text-ink">
        No tests match your filters
      </h3>
      <p className="text-sm text-muted">{description}</p>
      <Link
        href="/"
        className="flex h-11 items-center rounded-lg border border-line px-3 text-sm font-medium text-brand"
      >
        Clear filters
      </Link>
    </div>
  );
}
