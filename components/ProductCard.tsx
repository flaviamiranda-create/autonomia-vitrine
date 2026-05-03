"use client";

import { useState, useRef, useEffect } from "react";

type Status = "available" | "locked" | "coming-soon";
type BadgeVariant = "green" | "orange" | "purple";
type Accent = "orange" | "purple" | "pink";

interface ProductCardProps {
  title: string;
  description: string;
  category: string;
  status: Status;
  badge: string;
  badgeVariant: BadgeVariant;
  accent?: Accent;
  coverImage?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  popoverText?: string;
  showEmailCapture?: boolean;
}

const accentGradients: Record<Accent, string> = {
  orange:
    "linear-gradient(135deg, rgba(255,77,28,0.14) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(255,77,28,0.09) 0%, transparent 55%), #1A0F0A",
  purple:
    "linear-gradient(135deg, rgba(123,63,173,0.14) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(123,63,173,0.09) 0%, transparent 55%), #1A0F0A",
  pink:
    "linear-gradient(135deg, rgba(212,84,122,0.14) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(212,84,122,0.09) 0%, transparent 55%), #1A0F0A",
};

const badgeClasses: Record<BadgeVariant, string> = {
  green: "bg-green-500/20 text-green-400 border border-green-500/30",
  orange: "bg-[#FF4D1C]/20 text-[#FF4D1C] border border-[#FF4D1C]/30",
  purple: "bg-[#7B3FAD]/20 text-[#C4A3E8] border border-[#7B3FAD]/30",
};

function LockIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="#9E8B82" strokeWidth="1.5" />
      <path d="M8 11V7a4 4 0 018 0v4" stroke="#9E8B82" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ProductCard({
  title,
  description,
  category,
  status,
  badge,
  badgeVariant,
  accent = "orange",
  coverImage,
  buttonText,
  buttonHref,
  onButtonClick,
  popoverText,
  showEmailCapture,
}: ProductCardProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!popoverOpen) return;
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [popoverOpen]);

  const isInteractive = status === "locked" || status === "coming-soon";
  const togglePopover = () => {
    if (isInteractive) setPopoverOpen((p) => !p);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setEmailLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "", email }),
      });
      if (res.ok) setEmailSuccess(true);
    } catch {
      // silent
    } finally {
      setEmailLoading(false);
    }
  };

  // ── LOCKED / COMING-SOON — estilo Midtrack ─────────────────────────────
  if (isInteractive) {
    return (
      <div
        ref={cardRef}
        className="relative flex flex-col rounded-2xl overflow-visible border border-white/5 cursor-pointer select-none"
        style={{ background: "#0E0B09", minHeight: "240px" }}
        onClick={togglePopover}
      >
        {/* Category + Badge */}
        <div className="flex items-start justify-between gap-2 px-5 pt-5">
          <span
            className="text-[10px] font-syne font-bold tracking-[0.18em] uppercase text-white"
            style={{ opacity: 0.5 }}
          >
            {category}
          </span>
          <span
            className={`text-[10px] font-syne font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full whitespace-nowrap ${badgeClasses[badgeVariant]}`}
          >
            {badge}
          </span>
        </div>

        {/* Lock icon — centralizado */}
        <div className="flex-1 flex items-center justify-center py-5">
          <LockIcon />
        </div>

        {/* Title + description */}
        <div className="px-5 pb-5">
          <h3
            className="font-syne font-extrabold text-white text-lg leading-snug mb-2"
            style={{ opacity: 0.5 }}
          >
            {title}
          </h3>
          <p className="text-xs font-sans leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.28)" }}>
            {description}
          </p>
        </div>

        {/* Popover */}
        {popoverOpen && (
          <div className="absolute left-0 right-0 bottom-0 translate-y-full z-20 pt-2">
            <div className="bg-brand-text rounded-2xl p-4 shadow-2xl border border-white/5">
              {showEmailCapture && !emailSuccess ? (
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <p className="text-white/75 text-xs font-sans leading-relaxed">
                    {popoverText}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="flex-1 bg-white/10 text-white text-xs rounded-lg px-3 py-2 placeholder:text-white/35 outline-none border border-white/10 focus:border-white/30 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={emailLoading || !email}
                      className="px-3 py-2 bg-brand-purple text-white text-xs rounded-lg font-sans font-medium hover:opacity-90 disabled:opacity-50 transition-opacity whitespace-nowrap"
                    >
                      {emailLoading ? "..." : "Avise-me"}
                    </button>
                  </div>
                </form>
              ) : emailSuccess ? (
                <p className="text-green-400 text-xs font-sans">
                  ✓ Perfeito! Você será avisada quando lançar.
                </p>
              ) : (
                <p className="text-white/75 text-xs font-sans leading-relaxed">
                  {popoverText}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── AVAILABLE — com ou sem foto real ───────────────────────────────────
  const coverStyle = coverImage
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.75) 100%), url('${coverImage}')`,
        backgroundSize: "cover" as const,
        backgroundPosition: "center" as const,
      }
    : { background: accentGradients[accent] };

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col rounded-2xl overflow-visible border border-brand-border shadow-sm"
    >
      {/* Dark / photo cover */}
      <div
        className="relative px-5 pt-5 pb-8"
        style={{ ...coverStyle, minHeight: "190px" }}
      >
        <div className="flex items-start justify-between gap-2 mb-5">
          <span className="text-[10px] font-syne font-bold tracking-[0.18em] uppercase text-white/80">
            {category}
          </span>
          <span
            className={`text-[10px] font-syne font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full whitespace-nowrap ${badgeClasses[badgeVariant]}`}
          >
            {badge}
          </span>
        </div>
        <h3 className="font-syne font-extrabold text-white text-lg leading-snug">
          {title}
        </h3>
      </div>

      {/* White content */}
      <div className="flex-1 bg-brand-card px-5 py-4 flex flex-col gap-3 rounded-b-2xl">
        <p className="text-sm text-brand-secondary font-sans leading-relaxed">
          {description}
        </p>

        {buttonHref ? (
          <a
            href={buttonHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-brand-orange text-white font-sans font-medium text-sm hover:opacity-90 transition-opacity"
          >
            {buttonText}
          </a>
        ) : (
          <button
            onClick={onButtonClick}
            className="mt-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-brand-orange text-white font-sans font-medium text-sm hover:opacity-90 transition-opacity"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
