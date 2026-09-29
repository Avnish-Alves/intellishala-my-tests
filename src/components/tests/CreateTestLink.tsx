import Link from "next/link";
import { PlusIcon } from "@/components/icons";

export default function CreateTestLink() {
  return (
    <Link
      href="#"
      className="flex h-11 items-center gap-2 self-start rounded-lg sm:self-auto bg-brand px-3 text-sm font-medium text-white"
    >
      <PlusIcon className="h-4 w-4" />
      Create Test
    </Link>
  );
}
