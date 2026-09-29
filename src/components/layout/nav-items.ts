import {
  AIAssistantIcon,
  ClassesIcon,
  CreateTestIcon,
  HomeworkIcon,
  MyFilesIcon,
  MyTestsIcon,
  QuestionBankIcon,
  ResultIcon,
} from "@/components/icons";

export const NAV_ITEMS = [
  { label: "My Classes", href: "#", icon: ClassesIcon, active: false },
  { label: "Create Test", href: "#", icon: CreateTestIcon, active: false },
  { label: "My Tests", href: "#", icon: MyTestsIcon, active: true },
  { label: "Homework", href: "#", icon: HomeworkIcon, active: false },
  { label: "Question Bank", href: "#", icon: QuestionBankIcon, active: false },
  { label: "My Files", href: "#", icon: MyFilesIcon, active: false },
  { label: "Result", href: "#", icon: ResultIcon, active: false },
  { label: "AI Assistant", href: "#", icon: AIAssistantIcon, active: false },
];
