"use client";

import { useState, useRef, useEffect } from "react";

type Status = "available" | "locked" | "coming-soon" | "sob-demanda";
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
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  popoverText?: string;
  showEmailCapture?: boolean;
  footerText?: string;
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
  green:
    "bg-green-500/15 text-green-400 border border-green-500/25",
  orange:
    "bg-[#FF4D1C]/15 text-[#FF4D1C] border border-[#FF4D1C]/25",
  purple:
    "bg-[#7B3FAD]/15 text-[#C4A3E8] border border-[#7B3FAD]/25",
};

export default function ProductCard({
  title,
  description,
  category,
  status,
  badge,
  badgeVariant,
  accent = "orange",
  buttonText,
  buttonHref,
  onButtonClick,
  popoverText,
  showEmailCapture,
  footerText,
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

  const isInteractive =
    status === "locked" || status === "coming-soon" || status === "sob-demanda";

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

  const ctaLabel =
    status === "locked"
      ? "Como desbloquear? →"
      : status === "coming-soon"
      ? "Avise-me quando sair →"
      : "Saber mais →";

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col rounded-2xl overflow-visible border border-brand-border shadow-sm"
    >
      {/* ── Dark cover ───────────────────────────────── */}
      <div
        className={`relative px-5 pt-5 pb-8 ${isInteractive ? "cursor-pointer" : ""}`}
        style={{ background: accentGradients[accent], minHeight: "190px" }}
        onClick={togglePopover}
      >
        {/* Category + Badge */}
        <div className="flex items-start justify-between gap-2 mb-5">
          <span className="text-[10px] font-syne font-bold tracking-[0.18em] uppercase text-[#FF4D1C]">
            {category}
          </span>
          <span
            className={`text-[10px] font-syne font-bold tracking-[0.08em] uppercase px-2.5 py-1 rounded-full whitespace-nowrap ${badgeClasses[badgeVariant]}`}
          >
            {badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-syne font-extrabold text-white text-lg leading-snug">
          {title}
        </h3>

        {/* Lock veil */}
        {status === "locked" && (
          <div className="absolute inset-0 rounded-t-2xl bg-black/20" />
        )}
      </div>

      {/* ── White content ────────────────────────────── */}
      <div className="flex-1 bg-brand-card px-5 py-4 flex flex-col gap-3 rounded-b-2xl">
        <p className="text-sm text-brand-secondary font-sans leading-relaxed">
          {description}
        </p>

        {footerText && (
          <p className="text-xs text-brand-muted font-sans italic border-t border-brand-border pt-3 mt-1">
            {footerText}
          </p>
        )}

        {/* Available: real button */}
        {status === "available" &&
          (buttonHref ? (
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
          ))}

        {/* Interactive: subtle text CTA */}
        {isInteractive && (
          <button
            onClick={togglePopover}
            className="mt-auto text-xs text-brand-muted font-sans text-left hover:text-brand-secondary transition-colors"
          >
            {ctaLabel}
          </button>
        )}
      </div>

      {/* ── Popover ──────────────────────────────────── */}
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
