// Neuro-OS Sound Engine
// Procedural UI sounds via Web Audio API — no external files

let audioCtx: AudioContext | null = null;
let enabled = true;

function getCtx(): AudioContext | null {
  if (!enabled) return null;
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEnabled(v: boolean) {
  enabled = v;
}

export function isSoundEnabled() {
  return enabled;
}

/* ─── Sound primitives ─── */

function playTone({ freq, duration, type = "sine", volume = 0.08, decay = true }: {
  freq: number;
  duration: number;
  type?: OscillatorType;
  volume?: number;
  decay?: boolean;
}) {
  const ctx = getCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(volume, ctx.currentTime);
  if (decay) {
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  }

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playClick({ freq = 800, volume = 0.06 }: { freq?: number; volume?: number } = {}) {
  const ctx = getCtx();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.03);

  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.05);
}

/* ─── Public sound API ─── */

export const sounds = {
  /** Soft mechanical tick for button presses */
  button() {
    playClick({ freq: 600, volume: 0.04 });
  },

  /** Satisfying chime for test pass */
  pass() {
    const ctx = getCtx();
    if (!ctx) return;

    // Two-tone success chime: C5 → E5
    playTone({ freq: 523.25, duration: 0.12, volume: 0.06 });
    setTimeout(() => {
      playTone({ freq: 659.25, duration: 0.18, volume: 0.06 });
    }, 60);
  },

  /** Low thud for test fail */
  fail() {
    playTone({ freq: 120, duration: 0.2, type: "sawtooth", volume: 0.05 });
  },

  /** Generator spin-up for Hard Mode confirm */
  hardMode() {
    const ctx = getCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    // Lowpass filter to soften the sawtooth
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  },

  /** Sonar ping for pause reminder */
  ping() {
    playTone({ freq: 880, duration: 0.3, volume: 0.04 });
  },

  /** Gentle pop for undo */
  undo() {
    playClick({ freq: 400, volume: 0.03 });
  },

  /** Subtle whoosh for page transition */
  whoosh() {
    const ctx = getCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  },
};
