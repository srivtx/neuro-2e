"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Cpu, Map, Grid3x3, Dumbbell, CalendarDays, FlaskConical, RotateCcw, Keyboard, PenLine, Battery, BatteryWarning, BatteryLow } from "lucide-react";
import { getTodayCCU } from "@/lib/actions";

const links = [
  { href: "/", label: "Dashboard", icon: Cpu },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/patterns", label: "Patterns", icon: Grid3x3 },
  { href: "/practice", label: "Practice", icon: Dumbbell },
  { href: "/review", label: "Review", icon: RotateCcw },
  { href: "/warmup", label: "Warmup", icon: Keyboard },
  { href: "/paper", label: "Paper", icon: PenLine },
  { href: "/daily", label: "Daily OS", icon: CalendarDays },
  { href: "/science", label: "The Science", icon: FlaskConical },
];

export function Nav() {
  const pathname = usePathname();
  const [ccu, setCcu] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const value = await getTodayCCU();
      if (mounted) setCcu(value);
    }
    load();
    const interval = setInterval(load, 30000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const remaining = ccu !== null ? 100 - ccu : 100;
  const ccuColor = remaining < 20 ? "text-rose-400" : remaining < 40 ? "text-amber-400" : remaining < 60 ? "text-sky-400" : "text-emerald-400";
  const CCUIcon = remaining < 20 ? BatteryWarning : remaining < 40 ? BatteryLow : Battery;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-black font-bold text-xs font-mono">N</span>
          </div>
          <span className="font-semibold text-sm tracking-tight">NEURO-OS</span>
        </Link>

        {ccu !== null && (
          <div className="hidden sm:flex items-center gap-1.5 mr-2" title={`${remaining} CCU remaining today`}>
            <CCUIcon size={14} className={ccuColor} />
            <span className={`text-[10px] font-mono font-medium ${ccuColor}`}>{ccu}/100</span>
          </div>
        )}

        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors rounded-md whitespace-nowrap flex-shrink-0 ${
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
