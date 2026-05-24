"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "@/components/SessionProvider";
import {
  Cpu, Map, Grid3x3, Dumbbell, CalendarDays, FlaskConical,
  RotateCcw, Keyboard, PenLine, Battery, BatteryWarning, BatteryLow
} from "lucide-react";
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
  const { active: sessionActive } = useSession();

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

  // Status LED color based on session state
  const statusColor = sessionActive ? "status-led-amber" : "status-led-off";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-11 flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 group flex-shrink-0 mr-auto">
          <div className="w-5 h-5 bg-white rounded-[3px] flex items-center justify-center transition-transform duration-100 group-active:scale-95">
            <span className="text-black font-bold text-[10px] font-mono">N</span>
          </div>
          <span className="font-semibold text-xs tracking-tight font-mono hidden sm:inline">NEURO-OS</span>
          <span className={`status-led ${statusColor} transition-colors duration-300`} title={sessionActive ? "Session active" : "Standby"} />
        </Link>

        {/* Right cluster: Nav + CCU */}
        <div className="flex items-center gap-2">
          {/* Nav Links */}
          <nav className="flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1 px-2 py-1 text-[11px] font-medium transition-all duration-100 rounded-md whitespace-nowrap flex-shrink-0 font-mono active:translate-y-px ${
                  isActive
                    ? "bg-white/10 text-white border border-white/10"
                    : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon size={13} />
                <span className="hidden lg:inline">{link.label}</span>
              </Link>
            );
          })}
          </nav>

          {/* CCU Indicator */}
          {ccu !== null && (
            <div className="hidden md:flex items-center gap-1 pl-1.5 border-l border-white/10 flex-shrink-0" title={`${remaining} CCU remaining today`}>
              <CCUIcon size={12} className={ccuColor} />
              <span className={`text-[10px] font-mono font-medium ${ccuColor}`}>{ccu}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
