const SUBJECT_COLORS: Record<string, string> = {
  Maths: "text-[#0156f3]",
  English: "text-[#9333ea]",
  Science: "text-[#15803d]",
  "Social Science": "text-[#b45309]",
};

export default function SubjectLabel({ subject }: { subject: string }) {
  return (
    <span
      className={`text-xs ${SUBJECT_COLORS[subject] ?? "text-muted"}`}
    >
      {subject}
    </span>
  );
}
