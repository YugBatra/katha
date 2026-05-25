"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Story, StoryElement } from "../lib/types";

const PULSE_DURATION: Record<StoryElement, string> = {
  fire: "2s",
  spirit: "4s",
  water: "6s",
  forest: "5s",
  memory: "7s",
  court: "4s",
};

type StoryCardProps = {
  story: Story;
  isHovered: boolean;
  isDeemphasized: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function StoryCard({
  story,
  isHovered,
  isDeemphasized,
  onMouseEnter,
  onMouseLeave,
}: StoryCardProps) {
  const {
    id,
    title,
    author,
    category,
    chapterCount,
    mood,
    glowColor,
    posterUrl,
    element,
  } = story;

  const chapterLabel = `${chapterCount} ${chapterCount === 1 ? "chapter" : "chapters"}`;
  const ariaLabel = `${title} by ${author} — ${category}, ${chapterLabel}`;

  const cardClass = `katha-card-${id}`;
  const animName = `katha-pulse-${id}`;
  const duration = PULSE_DURATION[element];

  const restShadow = `0 0 6px ${glowColor}50, 0 0 12px ${glowColor}25`;
  const peakShadow = `0 0 12px ${glowColor}80, 0 0 24px ${glowColor}45, 0 0 40px ${glowColor}20`;

  const keyframes = `
.${cardClass} {
  box-shadow: ${restShadow};
  animation: ${animName} ${duration} ease-in-out infinite;
}
.${cardClass}:hover,
.${cardClass}:focus-visible {
  animation: none;
  box-shadow: ${peakShadow};
}
@keyframes ${animName} {
  0%, 100% { box-shadow: ${restShadow}; }
  50% { box-shadow: ${peakShadow}; }
}
`;

  const wrapperStyle: CSSProperties = {
    transform: isHovered
      ? "scale(1.04)"
      : isDeemphasized
        ? "scale(0.97)"
        : undefined,
    filter: isDeemphasized ? "blur(2px) brightness(0.4)" : undefined,
    zIndex: isHovered ? 10 : undefined,
    transitionDuration: isHovered || isDeemphasized ? "250ms" : "300ms",
  };

  const articleStyle: CSSProperties = {
    borderColor: `${glowColor}30`,
  };

  const fadeOverlayStyle: CSSProperties = {
    background: `linear-gradient(to bottom, transparent 0%, color-mix(in srgb, #000 50%, ${mood.primary}) 100%)`,
    opacity: 0.7,
  };

  return (
    <div
      className="relative w-52 shrink-0 transition-all ease-out"
      style={wrapperStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocusCapture={onMouseEnter}
      onBlurCapture={onMouseLeave}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <Link
        href={`/stories/${id}`}
        aria-label={ariaLabel}
        className="block cursor-pointer outline-none"
      >
        <article
          className={`${cardClass} relative flex flex-col overflow-hidden rounded-2xl border bg-katha-surface`}
          style={articleStyle}
        >
          <div
            className="relative h-[624px] w-full overflow-hidden"
            style={{ backgroundColor: mood.primary }}
          >
            <Image
              src={posterUrl}
              alt={title}
              fill
              sizes="208px"
              className="object-cover object-center"
              priority={false}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-[15%]"
              style={fadeOverlayStyle}
            />
            <span
              className="font-body absolute bottom-0 left-0 p-2 text-[10px] uppercase tracking-[0.2em]"
              style={{ color: mood.accent }}
            >
              {mood.label}
            </span>
          </div>

          <div aria-hidden="true" className="h-px w-full bg-katha-gold/60" />

          <div className="relative flex min-h-[208px] flex-col items-center gap-2 bg-katha-surface px-3 pt-4 pb-8 text-center">
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
              {chapterLabel}
            </p>
          </div>
        </article>
      </Link>
    </div>
  );
}
