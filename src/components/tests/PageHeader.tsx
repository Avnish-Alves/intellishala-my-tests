import CreateTestLink from "@/components/tests/CreateTestLink";

export default function PageHeader({ showCreate }: { showCreate: boolean }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-ink xl:text-[32px] xl:leading-10">
          My Tests
        </h1>
        <p className="mt-1 text-base text-muted">
          All the tests you&apos;ve created, across your classes.
        </p>
      </div>
      {showCreate && <CreateTestLink />}
    </div>
  );
}
