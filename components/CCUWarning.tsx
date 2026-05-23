"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Battery, BatteryWarning, BatteryLow, TrendingDown } from "lucide-react";
import { getTodayCCU } from "@/lib/actions";

export default function CCUWarning() {
  const [ccu, setCcu] = useState<number | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const value = await getTodayCCU();
      if (!mounted) return;
      setCcu(value);
      // Slight delay before showing so it doesn't snap in with the page load
      if (value > 40) {
        setShow(true);
      } else {
        setShow(true);
      }
    }
    load();
    const interval = setInterval(load, 30000);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  if (ccu === null || !show) return null;

  const safeBudget = 100;
  const spent = ccu;
  const remaining = Math.max(0, safeBudget - spent);
  const inDebt = spent > safeBudget;
  const debtAmount = inDebt ? spent - safeBudget : 0;

  // Determine severity
  let severity: "debt" | "danger" | "warning" | "caution" = "caution";
  if (inDebt) severity = "debt";
  else if (remaining < 20) severity = "danger";
  else if (remaining < 40) severity = "warning";
  else if (remaining < 60) severity = "caution";
  else return null; // healthy, don't show

  const styles = {
    debt: {
      bg: "bg-rose-950/50 border-rose-800/60",
      text: "text-rose-300",
      sub: "text-rose-400/70",
      icon: <TrendingDown size={16} className="text-rose-400" />,
      title: "Metabolic Debt",
      message: `You have spent ${spent} CCU. You are ${debtAmount} CCU in debt. Do not start a new MSMW. Execute recovery protocol.`,
    },
    danger: {
      bg: "bg-rose-950/40 border-rose-900",
      text: "text-rose-300",
      sub: "text-rose-400/70",
      icon: <BatteryWarning size={16} className="text-rose-400" />,
      title: "Cognitive Budget Depleted",
      message: `Only ${remaining} CCU remaining. Do not start a new MSMW. Execute metabolic reset protocol.`,
    },
    warning: {
      bg: "bg-amber-950/30 border-amber-900",
      text: "text-amber-300",
      sub: "text-amber-400/70",
      icon: <BatteryLow size={16} className="text-amber-400" />,
      title: "Low Cognitive Budget",
      message: `${remaining} CCU left. One more MSMW possible but costly. Consider a shorter block or metabolic break.`,
    },
    caution: {
      bg: "bg-sky-950/30 border-sky-900",
      text: "text-sky-300",
      sub: "text-sky-400/70",
      icon: <Battery size={16} className="text-sky-400" />,
      title: "Cognitive Budget Halfway",
      message: `${remaining} CCU remaining. You have ~1 MSMW left before entering debt territory.`,
    },
  };

  const s = styles[severity];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -6, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`p-3.5 border rounded-lg ${s.bg} flex items-start gap-3`}
      >
        <div className="flex-shrink-0 mt-0.5">{s.icon}</div>
        <div className="flex-1 min-w-0">
          <div className={`text-xs font-semibold ${s.text}`}>{s.title}</div>
          <div className={`text-[11px] ${s.sub} mt-1 leading-relaxed`}>{s.message}</div>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className={`text-xs font-mono font-bold ${s.text}`}>
            {inDebt ? `${spent}` : `${spent}`}
            <span className="text-[10px] font-normal opacity-60 ml-0.5">/ {safeBudget}</span>
          </div>
          {inDebt && (
            <div className="text-[10px] font-mono text-rose-400 mt-0.5">+{debtAmount} debt</div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
