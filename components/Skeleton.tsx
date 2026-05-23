"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export function Skeleton({ className, children }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-neutral-800/60 rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SkeletonText({ lines = 1, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <Skeleton className={cn("h-32 w-full", className)} />;
}

export function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-10 w-full", className)} />;
}
