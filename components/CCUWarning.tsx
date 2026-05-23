"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Battery, BatteryWarning, BatteryLow } from "lucide-react";
import { getTodayCCU } from "@/lib/actions";

export default function CCUWarning() {
  const [ccu, setCcu] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const value = await getTodayCCU();
      if (mounted) setCcu(value);
    }
    load();
    // Refresh every 30s to stay current across tabs
    const interval = setInterval(load, 30000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  if (ccu === null) return null;

  const remaining = 100 - ccu;
  const danger = remaining < 20;
  const warning = remaining < 40 && !danger;
  const caution = remaining < 60 && !warning && !danger;

  if (!danger && !warning && !caution) return null;

  const bg = danger ? "bg-rose-950/40 border-rose-900" : warning ? "bg-amber-950/30 border-amber-900" : "bg-sky-950/30 border-sky-900";
  const text = danger ? "text-rose-300" : warning ? "text-amber-300" : "text-sky-300";
  const subtext = danger ? "text-rose-400/70" : warning ? "text-amber-400/70" : "text-sky-400/70";
  const icon = danger ? <BatteryWarning size={16} className="text-rose-400" /> : warning ? <BatteryLow size={16} className="text-amber-400" /> : <Battery size={16} className="text-sky-400" />;

  return (
    <div className={`p-3 border rounded-md ${bg} flex items-start gap-3`}>
      {icon}
      <div className="flex-1 min-w-0">
        <div className={`text-xs font-medium ${text}`}>
          {danger ? "CRITICAL: Cognitive Budget Depleted" : warning ? "WARNING: Low Cognitive Budget" : "CAUTION: Cognitive Budget Halfway"}
        </div>
        <div className={`text-[11px] ${subtext} mt-0.5`}>
          {danger
            ? `Only ${remaining} CCU remaining. Do not start a new MSMW. Execute metabolic reset protocol.`
            : warning
            ? `${remaining} CCU left. One more MSMW (${remaining >= 20 ? "possible but costly" : "not possible"}). Consider shorter block or metabolic break.`
            : `${remaining} CCU remaining. You have ~1 MSMW left before entering debt territory.`}
        </div>
      </div>
      <div className="flex-shrink-0">
        <div className={`text-xs font-mono font-bold ${text}`}>{ccu} / 100</div>
      </div>
    </div>
  );
}
