"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "js", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="block-elevated overflow-hidden my-4">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <span className="text-xs text-zinc-400 font-mono">{filename}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-zinc-300">{code}</code>
      </pre>
    </div>
  );
}
