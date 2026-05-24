# NEURO-OS

**A cognitive execution system for the 2e monolithic systems thinker.**

Built for brains that process in parallel, not sequence. For pattern-matchers who see structure before syntax. For learners who need to derive, not memorize.

Neuro-OS is a self-hosted web application that structures algorithmic pattern mastery through monolithic simulation — 90-120 minute deep-work blocks where you derive from first principles, build mental models, and snap procedural memory into place.

**[Live Demo](https://neuro-2e.vercel.app)**

---

## What It Is

A personal training ground for **16 algorithmic patterns** across 240 LeetCode problems. Not a course. Not a blog. A **cognitive instrument**.

- **Code-first, bottom-up ingestion** — you write before you read
- **Onion-layer progressive disclosure** — skeleton → trigger → flesh
- **Derivation logs** — derive why a pattern is necessary, not merely sufficient
- **MSMW timers** — 90-120 minute monolithic simulation blocks with pause-and-render reminders
- **Cognitive Currency Units (CCU)** — energy budget tracking to prevent metabolic debt
- **Spaced repetition** — review queue with [1, 3, 7, 14, 30, 60, 90] day intervals
- **Paper whiteboard** — canvas-based thinking space for tracing algorithms
- **Sound design** — procedural audio feedback via Web Audio API

---

## Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Turso](https://img.shields.io/badge/Turso-4FFFB0?style=flat&logo=libsql&logoColor=black)](https://turso.tech)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)](https://framer.com/motion)

---

## Architecture

```
neuro-os/
├── app/                  # Next.js App Router pages
├── components/           # React components (HUD, whiteboard, timer)
├── lib/                  # Data layer + business logic
│   ├── patterns.ts       # 16 algorithmic patterns
│   ├── problems/         # 240 LeetCode problems (6 batches)
│   ├── db.ts             # Unified SQLite / Turso interface
│   ├── actions.ts        # Server Actions
│   ├── sound.ts          # Web Audio API engine
│   └── theme.ts          # Pattern color theming
└── public/               # Static assets
```

---

## Cognitive Model

Designed around the **2e profile**:

| Constraint | System Response |
|---|---|
| Delayed frontostriatal myelination | Derivation logs force first-principles reasoning |
| Working memory volatility | Onion-layer disclosure: one layer at a time |
| Context-switching crashes | Monolithic simulation blocks: one pattern, 90-120 min |
| Word-blur input saturation | Emergency protocol: hard stop → state dump → metabolic reset |
| Retrieval latency failure | ~100 derivation cycles per pattern for proceduralization |

---

## Features

- **Pattern Library** — 16 patterns with triggers, invariants, templates, and training sets
- **Practice Mode** — Live coding environment with test runner and derivation log
- **Review Queue** — Spaced repetition with auto-scheduling
- **Paper** — Canvas whiteboard with dot grid, templates (array, linked list, tree)
- **Daily OS** — Progressive disclosure checklist (pre-flight → in-flight → post-flight → metabolic)
- **YouTube Music** — Embedded player for focus music
- **Streak Heatmap** — 7-day consistency tracker

---

## License

MIT
