export default function UserProfile() {
  return (
    <div className="flex items-center gap-3 px-1">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-sm font-medium text-brand"
      >
        DT
      </span>
      <span className="text-sm font-medium text-ink">Demo Teacher</span>
    </div>
  );
}
