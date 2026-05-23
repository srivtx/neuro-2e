"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, Grid3x3, Dumbbell, CalendarDays, FlaskConical } from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: Cpu },
  { href: "/patterns", label: "Patterns", icon: Grid3x3 },
  { href: "/practice", label: "Practice", icon: Dumbbell },
  { href: "/daily", label: "Daily OS", icon: CalendarDays },
  { href: "/science", label: "The Science", icon: FlaskConical },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-black font-bold text-xs font-mono">N</span>
          </div>
          <span className="font-semibold text-sm tracking-tight">NEURO-OS</span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors rounded-md ${
                  isActive
                    ? "bg-neutral-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-neutral-900"
                }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
