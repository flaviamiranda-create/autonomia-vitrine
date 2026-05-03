"use client";

import { useState } from "react";

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LeadModal({ open, onClose, onSuccess }: LeadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Preencha todos os campos");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error();
      onSuccess();
      onClose();
      setName("");
      setEmail("");
    } catch {
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-brand-muted hover:bg-brand-bg hover:text-brand-text transition-colors text-lg"
          aria-label="Fechar"
        >
          ✕
        </button>

        <h2 className="font-syne font-extrabold text-xl text-brand-text mb-1">
          Receba a planilha gratuita
        </h2>
        <p className="text-sm text-brand-muted font-sans mb-7">
          Preencha abaixo e o link chegará no seu e-mail.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-syne font-bold tracking-[0.18em] uppercase text-brand-secondary">
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text font-sans outline-none focus:border-brand-orange transition-colors placeholder:text-brand-muted"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-syne font-bold tracking-[0.18em] uppercase text-brand-secondary">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-sm text-brand-text font-sans outline-none focus:border-brand-orange transition-colors placeholder:text-brand-muted"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 font-sans">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-orange text-white font-sans font-medium rounded-xl hover:opacity-90 disabled:opacity-60 transition-opacity text-sm"
          >
            {loading ? "Enviando..." : "Enviar planilha"}
          </button>
        </form>
      </div>
    </div>
  );
}
