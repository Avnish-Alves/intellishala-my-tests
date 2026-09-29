import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { SignOutIcon } from "@/components/icons";
import WorkspaceCard from "@/components/layout/WorkspaceCard";
import UserProfile from "@/components/layout/UserProfile";
import { NAV_ITEMS } from "@/components/layout/nav-items";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-white px-5 py-6 xl:flex">
      <Logo />

      <div className="mt-5">
        <WorkspaceCard />
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

      <div className="mt-5">
        <UserProfile />
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
