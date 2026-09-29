export default function WorkspaceCard() {
  return (
    <div className="rounded-xl border border-line px-3 py-2.5">
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
  );
}
