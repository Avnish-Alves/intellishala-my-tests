import type { TestRow } from "@/lib/tests";
import StatusPill from "@/components/tests/StatusPill";
import SubjectLabel from "@/components/tests/SubjectLabel";

const HEADER_CLASS =
  "h-14 short:h-11 border-b border-line pr-4 text-left text-sm font-normal uppercase text-muted";

export default function TestsTable({
  rows,
  fill = false,
}: {
  rows: TestRow[];
  fill?: boolean;
}) {
  return (
    <div className="mt-6 hidden short:mt-4 lg:flex lg:flex-1 lg:flex-col">
      <table className={`w-full table-fixed ${fill ? "short:max-h-[574px] short:flex-1" : ""}`}>
        <colgroup>
          <col style={{ width: "18%" }} />
          <col style={{ width: "17.4%" }} />
          <col style={{ width: "14.7%" }} />
          <col style={{ width: "14.8%" }} />
          <col style={{ width: "12.9%" }} />
          <col style={{ width: "11.6%" }} />
          <col className="w-[116px]" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className={HEADER_CLASS}>
              Title
            </th>
            <th scope="col" className={HEADER_CLASS}>
              Class &amp; Subject
            </th>
            <th scope="col" className={HEADER_CLASS}>
              Assigned
            </th>
            <th scope="col" className={HEADER_CLASS}>
              Due
            </th>
            <th scope="col" className={HEADER_CLASS}>
              Status
            </th>
            <th scope="col" className={HEADER_CLASS}>
              Submissions
            </th>
            <th scope="col" className={HEADER_CLASS}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="h-[106px] short:h-[82px] border-b border-line align-middle">
              <td className="pr-4">
                <p className="text-base font-medium leading-6 text-ink">
                  {row.title}
                </p>
                <p className="mt-1 text-xs text-muted">{row.questionLabel}</p>
              </td>
              <td className="pr-4">
                <p className="text-base font-medium text-ink">
                  {row.classLabel}
                </p>
                <div className="mt-1">
                  <SubjectLabel subject={row.subject} />
                </div>
              </td>
              <td className="pr-4 whitespace-nowrap text-base text-muted">
                {row.assignedLabel ?? (
                  <span className="text-muted">Not scheduled</span>
                )}
              </td>
              <td className="pr-4 whitespace-nowrap text-base text-muted">
                {row.dueLabel ?? <span className="text-muted">Not scheduled</span>}
              </td>
              <td className="pr-4">
                <StatusPill status={row.status} />
              </td>
              <td className="pr-4">
                <span className="inline-block w-full max-w-[108px] text-center text-base text-muted">
                  {row.submissionsLabel}
                </span>
              </td>
              <td className="pr-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`View ${row.title}`}
                    className="h-[42px] rounded-lg border border-line px-2 text-sm text-muted"
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
                    className="h-[42px] rounded-lg border border-line px-2 text-sm text-muted disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Result
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
