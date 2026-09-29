import type { TestRow } from "@/lib/tests";
import StatusPill from "@/components/tests/StatusPill";
import SubjectLabel from "@/components/tests/SubjectLabel";

const ACTION_BUTTON =
  "h-[42px] flex-1 rounded-lg border border-line px-2 text-sm text-muted";

function NotScheduled() {
  return <span className="text-muted">Not scheduled</span>;
}

export default function TestsCardList({ rows }: { rows: TestRow[] }) {
  return (
    <ul role="list" className="mt-6 flex flex-col gap-3 lg:hidden">
      {rows.map((row) => (
        <li key={row.id} className="rounded-xl border border-line p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="break-words text-base font-medium text-ink">
                {row.title}
              </p>
              <p className="mt-1 text-xs text-muted">{row.questionLabel}</p>
            </div>
            <div className="shrink-0">
              <StatusPill status={row.status} size="sm" />
            </div>
          </div>

          <div className="mt-3">
            <p className="text-base font-medium text-ink">{row.classLabel}</p>
            <div className="mt-1">
              <SubjectLabel subject={row.subject} />
            </div>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
            <div>
              <dt className="text-xs uppercase text-muted">Assigned</dt>
              <dd className="mt-0.5 text-sm text-ink">
                {row.assignedLabel ?? <NotScheduled />}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted">Due</dt>
              <dd className="mt-0.5 text-sm text-ink">
                {row.dueLabel ?? <NotScheduled />}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted">Submissions</dt>
              <dd className="mt-0.5 text-sm text-ink">
                {row.submissionsLabel}
              </dd>
            </div>
          </dl>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              aria-label={`View ${row.title}`}
              className={ACTION_BUTTON}
            >
              View
            </button>
            <button
              type="button"
              aria-label={`Results for ${row.title}`}
              disabled={!row.hasResults}
              title={
                row.hasResults
                  ? undefined
                  : "Results appear once the test is assigned"
              }
              className={`${ACTION_BUTTON} disabled:cursor-not-allowed disabled:opacity-50`}
            >
              Result
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
