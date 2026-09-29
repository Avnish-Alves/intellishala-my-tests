import Link from "next/link";
import Logo from "@/components/layout/Logo";
import {
  AIAssistantIcon,
  ClassesIcon,
  CreateTestIcon,
  HomeworkIcon,
  MyFilesIcon,
  MyTestsIcon,
  QuestionBankIcon,
  ResultIcon,
  SignOutIcon,
} from "@/components/icons";

const NAV_ITEMS = [
  { label: "My Classes", href: "#", icon: ClassesIcon, active: false },
  { label: "Create Test", href: "#", icon: CreateTestIcon, active: false },
  { label: "My Tests", href: "#", icon: MyTestsIcon, active: true },
  { label: "Homework", href: "#", icon: HomeworkIcon, active: false },
  { label: "Question Bank", href: "#", icon: QuestionBankIcon, active: false },
  { label: "My Files", href: "#", icon: MyFilesIcon, active: false },
  { label: "Result", href: "#", icon: ResultIcon, active: false },
  { label: "AI Assistant", href: "#", icon: AIAssistantIcon, active: false },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-white px-5 py-6 xl:flex">
      <Logo />

      <div className="mt-5 rounded-xl border border-line px-3 py-2.5">
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted">
          Workspace
        </p>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <span className="text-[13px] text-ink">Demo 2</span>
          <span className="rounded-md bg-brand px-1.5 py-0.5 text-[11px] font-medium text-white">
            Teacher
          </span>
        </div>
      </div>

      <nav aria-label="Main" className="mt-5 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon, active }) => (
          <Link
            key={label}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium ${
              active ? "bg-brand-soft text-brand" : "text-muted"
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-5 flex items-center gap-3 px-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-sm font-medium text-brand">
          DT
        </span>
        <span className="text-sm font-medium text-ink">Demo Teacher</span>
      </div>

      <button
        type="button"
        className="mt-3 flex h-12 w-full items-center gap-2 rounded-lg border border-danger bg-danger-soft px-4 text-sm font-medium text-danger-ink"
      >
        <SignOutIcon className="h-5 w-5" />
        Sign out
      </button>
    </aside>
  );
}
