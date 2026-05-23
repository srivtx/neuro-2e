"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Brain, Activity, Zap, ShieldCheck } from "lucide-react";

const cards = [
  {
    id: "real",
    title: "Is this real?",
    icon: <Brain size={18} />,
    color: "text-sky-400",
    short: "Yes. Not imagined. Neuroimaging confirms distinct architecture.",
    detail: `Multiple independent research programs confirm the 2e brain is structurally different:
• Hyper-connectivity locally, hypo-connectivity globally (Mottron, Courchesne, Uddin)
• Delayed PFC myelination (Shaw et al., NIH)
• Activity-dependent myelination means practice literally builds the bridge (Fields, Johansen-Berg)
• Industry evidence: SAP, Microsoft neurodiversity programs show measurable advantages in systems tasks.

The superpower narrative is fiction. The architecture is real. The advantage is conditional.`,
  },
  {
    id: "hope",
    title: "Will it change?",
    icon: <Activity size={18} />,
    color: "text-emerald-400",
    short: "Yes, with work. The brain is still developing at 22. Myelination continues to 25-30.",
    detail: `Evidence for hope:
• Lebel & Beaulieu: Frontal white matter matures until age 25-30
• Activity-dependent myelination: every deep work session signals oligodendrocytes to wrap axons
• Adult neuroplasticity: taxi drivers, jugglers, pianists all show structural brain changes
• Chunking & proceduralization (Simon, Anderson): 100 cycles compress first-principles into hardware-level primitives

Realistic expectation: gradual improvement, not normalization. By 26-28, retrieval speed and pattern recognition snap into place.`,
  },
  {
    id: "100",
    title: "The 100-Cycle Rule",
    icon: <Zap size={18} />,
    color: "text-amber-400",
    short: "Each pattern must be derived ~100 times before it snaps into procedural memory.",
    detail: `Why 100? Cellular kinetics:
• NMDA → CaMKII → CREB → BDNF cascade requires repeated stimulation
• 2e brains have elevated GluN2B (slower kinetics) and sparser synapses
• Each rederivation cycle deposits myelin and strengthens the retrieval bridge

Timeline:
• 1-5 cycles: Discovery (slow, needs examples)
• 6-15: Structuring (can identify pattern)
• 16-30: Compiling (syntax separates from logic)
• 31-50: Associating (10-min derivation)
• 51-75: Consolidating (pattern is default)
• 76-100: Snapping (derive under pressure)
• 100+: Mastery (hardware-level primitive)`,
  },
  {
    id: "protocol",
    title: "Why this protocol works",
    icon: <ShieldCheck size={18} />,
    color: "text-violet-400",
    short: "It respects the biology instead of fighting it.",
    detail: `Standard LeetCode grind assumes:
• Working memory holds multiple disconnected facts
• Context-switching is cheap
• Memorization is effective
• Speed is the metric

Your brain cannot do any of these. This app assumes:
• Working memory is monolithic (one 4K simulation at a time)
• Context-switching costs 20-30 minutes (thalamic teardown)
• Derivation is the only valid encoding (anti-heuristic filter)
• Depth is the only valid metric

The protocol is a prosthetic prefrontal cortex:
• LTS notes = external RAM
• MSMW timer = protects the thalamic gate
• Blocked practice = prevents monolithic simulation teardown
• Syntax sandbox = isolates motor memory from working memory`,
  },
];

export default function SciencePage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-1">Research Condensed</div>
        <h1 className="text-2xl font-bold tracking-tight">The Science</h1>
        <p className="text-sm text-zinc-500 mt-2">Evidence-based answers to the existential questions. No walls of text. Expand only what you need.</p>
      </div>

      <div className="space-y-3">
        {cards.map((card) => {
          const isOpen = openId === card.id;
          return (
            <div key={card.id} className={`block-square overflow-hidden ${isOpen ? "border-zinc-600" : ""}`}>
              <button
                onClick={() => setOpenId(isOpen ? null : card.id)}
                className="w-full flex items-start justify-between p-4 text-left hover:bg-neutral-900/30 transition-colors gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 ${card.color}`}>{card.icon}</span>
                  <div>
                    <div className="font-medium text-sm">{card.title}</div>
                    <div className="text-xs text-zinc-500 mt-1 leading-relaxed">{card.short}</div>
                  </div>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-zinc-500 flex-shrink-0 mt-1" /> : <ChevronDown size={16} className="text-zinc-500 flex-shrink-0 mt-1" />}
              </button>

              {isOpen && (
                <div className="border-t border-neutral-800 p-4">
                  <pre className="text-sm text-zinc-400 whitespace-pre-wrap font-sans leading-relaxed">
                    {card.detail}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Key Sources (minimal) */}
      <div className="block-square p-4">
        <div className="text-xs font-mono text-zinc-500 uppercase mb-3">Key Sources</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-500">
          <div className="p-2 bg-neutral-900/30 rounded border border-neutral-800">
            <span className="text-zinc-400">Shaw et al. (NIH)</span> — ADHD brain development
          </div>
          <div className="p-2 bg-neutral-900/30 rounded border border-neutral-800">
            <span className="text-zinc-400">Lebel & Beaulieu</span> — Myelination to age 25-30
          </div>
          <div className="p-2 bg-neutral-900/30 rounded border border-neutral-800">
            <span className="text-zinc-400">Fields (NIH)</span> — Activity-dependent myelination
          </div>
          <div className="p-2 bg-neutral-900/30 rounded border border-neutral-800">
            <span className="text-zinc-400">Simon & Chase / Anderson</span> — Chunking & proceduralization
          </div>
          <div className="p-2 bg-neutral-900/30 rounded border border-neutral-800">
            <span className="text-zinc-400">Mottron & Bzdok</span> — Autism heterogeneity
          </div>
          <div className="p-2 bg-neutral-900/30 rounded border border-neutral-800">
            <span className="text-zinc-400">Baron-Cohen / Doyle</span> — E-S theory & neurominority
          </div>
        </div>
      </div>
    </div>
  );
}
