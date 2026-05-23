export interface TestCase {
  input: string;
  expected: string;
  args: any[];
  expectedValue: any;
}

export interface Problem {
  id: string;
  patternId: string;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  number: number;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  why: string;
}

import { batch1Problems } from "./batch1";
import { batch2Problems } from "./batch2";
import { batch3Problems } from "./batch3";
import { batch4Problems } from "./batch4";
import { batch5Problems } from "./batch5";
import { batch6Problems } from "./batch6";

export const problems: Problem[] = [
  ...batch1Problems,
  ...batch2Problems,
  ...batch3Problems,
  ...batch4Problems,
  ...batch5Problems,
  ...batch6Problems,
];

export const getProblemsByPattern = (patternId: string) =>
  problems.filter((p) => p.patternId === patternId);
