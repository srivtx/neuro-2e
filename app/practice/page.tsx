"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import CodePlayground from "@/components/CodePlayground";
import FocusMode from "@/components/FocusMode";

function PracticeContent() {
  const searchParams = useSearchParams();
  const problemId = searchParams.get("problem") ?? undefined;
  const [focusMode, setFocusMode] = useState(false);

  return (
    <FocusMode isActive={focusMode} onToggle={() => setFocusMode((v) => !v)}>
      <CodePlayground initialProblemId={problemId} focusMode={focusMode} />
    </FocusMode>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="text-xs text-zinc-500 p-4">Loading practice...</div>}>
      <PracticeContent />
    </Suspense>
  );
}
