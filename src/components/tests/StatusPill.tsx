import type { TestStatus } from "@/lib/tests";

const COLORS: Record<TestStatus, string> = {
  Scheduled: "bg-[#e9f1fe] text-[#0156f3]",
  Draft: "bg-[#f2f2f2] text-[#4b5563]",
  Published: "bg-[#ebf7f1] text-[#15803d]",
  Active: "bg-[#fff6e0] text-[#b45309]",
  Completed: "bg-[#f5ebff] text-[#7e22ce]",
  Overdue: "bg-[#fef1f0] text-[#c81e25]",
};

const SIZES: Record<"md" | "sm", string> = {
  md: "h-[42px] px-3 text-sm wide:px-[18px] wide:text-base",
  sm: "h-7 px-2.5 text-xs",
};

export default function StatusPill({
  status,
  size = "md",
}: {
  status: TestStatus;
  size?: "md" | "sm";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-lg font-medium whitespace-nowrap ${SIZES[size]} ${COLORS[status]}`}
    >
      {status}
    </span>
  );
}
