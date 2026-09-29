import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { MenuIcon, SignOutIcon } from "@/components/icons";
import WorkspaceCard from "@/components/layout/WorkspaceCard";
import UserProfile from "@/components/layout/UserProfile";
import { NAV_ITEMS } from "@/components/layout/nav-items";

export default function MobileTopBar() {
  return (
    <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-white px-4 xl:hidden">
      <Logo />

      <details id="mobile-menu" className="relative xl:hidden">
        <summary className="relative z-30 flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-line text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand [&::-webkit-details-marker]:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </summary>

        <div className="absolute right-0 top-12 z-30 max-h-[calc(100vh-5rem)] w-64 overflow-y-auto overscroll-contain rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
          <WorkspaceCard />

          <nav aria-label="Main" className="mt-2 flex flex-col gap-1">
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

          <div className="mt-2 border-t border-line pt-3">
            <UserProfile />
          </div>

          <button
            type="button"
            className="mt-3 flex h-12 w-full items-center gap-2 rounded-lg border border-danger bg-danger-soft px-4 text-sm font-medium text-danger-ink"
          >
            <SignOutIcon className="h-5 w-5" />
            Sign out
          </button>
        </div>
      </details>
    </div>
  );
}
