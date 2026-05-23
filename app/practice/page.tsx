"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CodePlayground from "@/components/CodePlayground";

function PracticeContent() {
  const searchParams = useSearchParams();
  const problemId = searchParams.get("problem") ?? undefined;

  return (
    <div>
      <CodePlayground initialProblemId={problemId} />
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="text-xs text-zinc-500 p-4">Loading practice...</div>}>
      <PracticeContent />
    </Suspense>
  );
}
