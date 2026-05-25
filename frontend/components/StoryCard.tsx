import Link from "next/link";
import type { CSSProperties } from "react";
import type { Story, StoryElement } from "../lib/types";

type ElementConfig = {
  baseFrequency: string;
  duration: string;
  palette: [string, string, string];
  scale: number;
  motion:
    | { kind: "flicker"; values: string }
    | { kind: "pulse"; values: string }
    | { kind: "drift"; axis: "x" | "y" | null; range: number };
};

const ELEMENTS: Record<StoryElement, ElementConfig> = {
  fire: {
    baseFrequency: "0.015 0.012",
    duration: "8s",
    palette: ["#5C1A0E", "#C4502A", "#C9951A"],
    scale: 70,
    motion: {
      kind: "flicker",
      values: "0.015 0.012;0.024 0.020;0.018 0.014;0.015 0.012",
    },
  },
  water: {
    baseFrequency: "0.008 0.006",
    duration: "20s",
    palette: ["#0F2A33", "#3498DB", "#7A9EB0"],
    scale: 80,
    motion: { kind: "drift", axis: "x", range: 40 },
  },
  forest: {
    baseFrequency: "0.012 0.010",
    duration: "14s",
    palette: ["#1F3324", "#2ECC71", "#1A4A2A"],
    scale: 60,
    motion: { kind: "drift", axis: "y", range: 50 },
  },
  spirit: {
    baseFrequency: "0.010 0.008",
    duration: "18s",
    palette: ["#2A1B3D", "#9B59B6", "#E8C97A"],
    scale: 75,
    motion: {
      kind: "pulse",
      values: "0.010 0.008;0.016 0.013;0.010 0.008",
    },
  },
  memory: {
    baseFrequency: "0.006 0.005",
    duration: "25s",
    palette: ["#2B1F15", "#8B6914", "#D8C5A5"],
    scale: 95,
    motion: { kind: "drift", axis: null, range: 0 },
  },
  court: {
    baseFrequency: "0.009 0.007",
    duration: "16s",
    palette: ["#1B2A5C", "#E8E0CC", "#4A6FA5"],
    scale: 55,
    motion: { kind: "drift", axis: null, range: 0 },
  },
};

function Atmosphere({ story }: { story: Story }) {
  const cfg = ELEMENTS[story.element];
  const filterId = `atm-filter-${story.id}`;
  const gradId = `atm-grad-${story.id}`;
  const [a, b, c] = cfg.palette;

  const turbulenceAnim =
    cfg.motion.kind === "flicker" || cfg.motion.kind === "pulse" ? (
      <animate
        attributeName="baseFrequency"
        values={cfg.motion.values}
        dur={cfg.duration}
        repeatCount="indefinite"
      />
    ) : (
      <animate
        attributeName="seed"
        values="0;120"
        dur={cfg.duration}
        repeatCount="indefinite"
      />
    );

  const offsetAnim =
    cfg.motion.kind === "drift" && cfg.motion.axis !== null ? (
      <feOffset dx="0" dy="0">
        <animate
          attributeName={cfg.motion.axis === "x" ? "dx" : "dy"}
          values={`${-cfg.motion.range / 2};${cfg.motion.range / 2};${-cfg.motion.range / 2}`}
          dur={cfg.duration}
          repeatCount="indefinite"
        />
      </feOffset>
    ) : null;

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 200 600"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="50%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </linearGradient>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={cfg.baseFrequency}
            numOctaves="3"
            seed="2"
            result="noise"
          >
            {turbulenceAnim}
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={cfg.scale}
          />
          {offsetAnim}
        </filter>
      </defs>
      <rect width="200" height="600" fill={story.mood.primary} />
      <rect
        x="-40"
        y="-40"
        width="280"
        height="680"
        fill={`url(#${gradId})`}
        filter={`url(#${filterId})`}
        opacity="0.88"
      />
    </svg>
  );
}

type StoryCardProps = {
  story: Story;
};

export default function StoryCard({ story }: StoryCardProps) {
  const {
    id,
    title,
    author,
    category,
    chapterCount,
    mood,
    glowColor,
  } = story;

  const glowStyle = {
    "--glow-rest": `0 0 8px ${glowColor}60, 0 0 24px ${glowColor}40`,
    "--glow-hover": `0 0 12px ${glowColor}90, 0 0 40px ${glowColor}60`,
    borderColor: `${glowColor}40`,
  } as CSSProperties;

  return (
    <Link
      href={`/stories/${id}`}
      aria-label={`${title} by ${author} — ${category}, ${chapterCount} ${chapterCount === 1 ? "chapter" : "chapters"}`}
      className="group block w-52 shrink-0 cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.04]"
    >
      <article
        className="relative flex aspect-[1/4] flex-col overflow-hidden rounded-2xl border bg-katha-surface shadow-[var(--glow-rest)] transition-shadow duration-300 ease-out group-hover:shadow-[var(--glow-hover)]"
        style={glowStyle}
      >
        <div
          className="relative basis-3/4 overflow-hidden"
          style={{ backgroundColor: mood.primary }}
        >
          <Atmosphere story={story} />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
            >
              <path
                d="M16 2 L19 13 L30 16 L19 19 L16 30 L13 19 L2 16 L13 13 Z"
                fill={mood.accent}
              />
            </svg>
          </div>
          <span
            className="font-body absolute bottom-0 left-0 p-2 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: mood.accent }}
          >
            {mood.label}
          </span>
        </div>

        <div
          aria-hidden="true"
          className="h-px w-full bg-katha-gold/60"
        />

        <div className="relative flex basis-1/4 flex-col items-center justify-start gap-2 bg-katha-surface px-3 pt-4 pb-8 text-center">
          <span className="font-body inline-flex items-center rounded-full border border-katha-gold bg-katha-indigo/40 px-2 py-0.5 text-[9px] uppercase tracking-widest text-katha-cream">
            {category}
          </span>
          <h2 className="font-heading text-lg font-semibold leading-tight text-katha-cream">
            {title}
          </h2>
          <p className="font-body text-[11px] italic text-katha-muted">
            {author}
          </p>
          <p className="font-body absolute bottom-2 left-0 right-0 text-[9px] uppercase tracking-widest text-katha-muted">
            {chapterCount} {chapterCount === 1 ? "chapter" : "chapters"}
          </p>
        </div>
      </article>
    </Link>
  );
}
