import "server-only";

import rawTests from "@/data/tests.json";
import type { RawTest } from "@/lib/tests";


export async function getTests(): Promise<RawTest[]> {
  return rawTests;
}
