  export const TEST_STATUSES = [
    "Active",
    "Scheduled",
    "Completed",
    "Published",
    "Overdue",
    "Draft",
  ] as const;

  export type TestStatus = (typeof TEST_STATUSES)[number];

  export interface RawTest {
    id: string;
    title: string;
    questionCount: number;
    className: string;
    subject: string;
    assignedAt: string | null;
    dueAt: string | null;
    status: string;
    submissions: {
      submitted: number;
      total: number;
    };
  }

  export interface TestRow {
    id: string;
    title: string;
    questionLabel: string;
    classKey: string;
    classLabel: string;
    subject: string;
    status: TestStatus;
    assignedLabel: string | null;
    dueLabel: string | null;
    dueTime: number | null;
    submissionsLabel: string;
    hasResults: boolean;
  }

  export interface Filters {
    query: string;
    classKey: string;
    status: TestStatus | "";
    page: number;
  }

  export interface ClassOption {
    value: string;
    label: string;
  }

  export const PAGE_SIZE = 5;

  export const DEFAULT_FILTERS: Filters = {
    query: "",
    classKey: "",
    status: "",
    page: 1,
  };

  const STATUS_PRIORITY: Record<TestStatus, number> = {
    Overdue: 0,
    Active: 1,
    Scheduled: 2,
    Draft: 3,
    Completed: 4,
    Published: 5,
  };

  const IST_FORMATTER = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  export function isTestStatus(value: string): value is TestStatus {
    return (TEST_STATUSES as readonly string[]).includes(value);
  }

  export function formatIST(iso: string): string {
    const parts = IST_FORMATTER.formatToParts(new Date(iso));
    const get = (type: Intl.DateTimeFormatPartTypes): string =>
      parts.find((part) => part.type === type)?.value ?? "";

    const day = get("day");
    const month = get("month");
    const hour = get("hour");
    const minute = get("minute");
    const dayPeriod = get("dayPeriod");

    return `${day} ${month}, ${hour}:${minute} ${dayPeriod}`;
  }

  function splitClassKey(classKey: string): [number, string] {
    const match = classKey.match(/^(\d+)\s+(.+)$/);
    if (!match) {
      return [0, classKey];
    }
    return [Number(match[1]), match[2]];
  }

  function toClassLabel(classKey: string): string {
    const [grade, section] = splitClassKey(classKey);
    return `Grade ${grade} • ${section}`;
  }

  function compareRows(a: TestRow, b: TestRow): number {
    const priorityDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    if (priorityDiff !== 0) {
      return priorityDiff;
    }

    switch (a.status) {
      case "Overdue":
      case "Active":
      case "Scheduled":
        return (
          (a.dueTime ?? Number.POSITIVE_INFINITY) -
          (b.dueTime ?? Number.POSITIVE_INFINITY)
        );
      case "Completed":
      case "Published":
        return (
          (b.dueTime ?? Number.NEGATIVE_INFINITY) -
          (a.dueTime ?? Number.NEGATIVE_INFINITY)
        );
      case "Draft":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  }

  export function toTestRows(raw: RawTest[]): TestRow[] {
    const rows: TestRow[] = raw.map((test) => {
      if (!isTestStatus(test.status)) {
        throw new Error(`Unknown status "${test.status}" for test ${test.id}`);
      }

      const status = test.status;
      const classKey = test.className;
      const dueTime = test.dueAt ? new Date(test.dueAt).getTime() : null;

      return {
        id: test.id,
        title: test.title,
        questionLabel: `${test.questionCount} Question${test.questionCount === 1 ? "" : "s"}`,
        classKey,
        classLabel: toClassLabel(classKey),
        subject: test.subject,
        status,
        assignedLabel: test.assignedAt ? formatIST(test.assignedAt) : null,
        dueLabel: test.dueAt ? formatIST(test.dueAt) : null,
        dueTime,
        submissionsLabel:
          test.submissions.total === 0
            ? "–"
            : `${test.submissions.submitted}/${test.submissions.total}`,
        hasResults: status !== "Draft" && status !== "Scheduled",
      };
    });

    return rows.sort(compareRows);
  }

  export function getClassOptions(rows: TestRow[]): ClassOption[] {
    const labelByKey = new Map<string, string>();
    for (const row of rows) {
      if (!labelByKey.has(row.classKey)) {
        labelByKey.set(row.classKey, row.classLabel);
      }
    }

    return Array.from(labelByKey.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => {
        const [gradeA, sectionA] = splitClassKey(a.value);
        const [gradeB, sectionB] = splitClassKey(b.value);
        if (gradeA !== gradeB) {
          return gradeA - gradeB;
        }
        return sectionA.localeCompare(sectionB);
      });
  }

  function firstValue(value: string | string[] | undefined): string {
    if (Array.isArray(value)) {
      return value[0] ?? "";
    }
    return value ?? "";
  }

  export function parseFilters(
    searchParams: Record<string, string | string[] | undefined>,
    classKeys: string[],
  ): Filters {
    const query = firstValue(searchParams.q).trim().slice(0, 100);

    const classRaw = firstValue(searchParams.class);
    const classKey = classKeys.includes(classRaw) ? classRaw : "";

    const statusRaw = firstValue(searchParams.status);
    const status = isTestStatus(statusRaw) ? statusRaw : "";

    const pageRaw = firstValue(searchParams.page);
    const pageNum = Number(pageRaw);
    const page = Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1;

    return { query, classKey, status, page };
  }

  export function filterTests(rows: TestRow[], filters: Filters): TestRow[] {
    const query = filters.query.trim().toLowerCase();

    return rows.filter((row) => {
      if (query && !row.title.toLowerCase().includes(query)) {
        return false;
      }
      if (filters.classKey && row.classKey !== filters.classKey) {
        return false;
      }
      if (filters.status && row.status !== filters.status) {
        return false;
      }
      return true;
    });
  }

  export interface PaginationResult<T> {
    items: T[];
    start: number;
    end: number;
    totalPages: number;
    current: number;
  }

  export function paginate<T>(
    rows: T[],
    page: number,
    pageSize: number,
  ): PaginationResult<T> {
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    const current = Math.min(Math.max(1, page), totalPages);
    const startIndex = (current - 1) * pageSize;
    const end = Math.min(startIndex + pageSize, rows.length);

    return {
      items: rows.slice(startIndex, end),
      start: rows.length === 0 ? 0 : startIndex + 1,
      end,
      totalPages,
      current,
    };
  }

  export function buildQuery(
    filters: Filters,
    overrides: Partial<Filters>,
  ): string {
    const merged = { ...filters, ...overrides };
    const params = new URLSearchParams();

    if (merged.query) {
      params.set("q", merged.query);
    }
    if (merged.classKey) {
      params.set("class", merged.classKey);
    }
    if (merged.status) {
      params.set("status", merged.status);
    }
    if (merged.page && merged.page !== 1) {
      params.set("page", String(merged.page));
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }
