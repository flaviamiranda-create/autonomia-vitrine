"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import LeadModal from "@/components/LeadModal";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="h-px flex-1 bg-brand-border" />
      <span className="text-[11px] font-syne font-bold tracking-[0.18em] uppercase text-brand-muted whitespace-nowrap px-2">
        {children}
      </span>
      <div className="h-px flex-1 bg-brand-border" />
    </div>
  );
}

export default function Home() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleLeadSuccess = () => {
    setSuccessMsg(
      "Enviado! Verifique seu e-mail — o link da planilha chegará em instantes."
    );
    setTimeout(() => setSuccessMsg(""), 9000);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-brand-bg pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {successMsg && (
            <div className="mb-10 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 font-sans text-center">
              {successMsg}
            </div>
          )}

          {/* ── 1. GRATUITOS ──────────────────────────────────────── */}
          <section className="mb-20">
            <SectionLabel>GRATUITOS — pegue agora ou ganhe desbloqueando</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              <ProductCard
                title="Planilha de Gestão Financeira"
                description="Registre atendimentos, despesas e veja seu lucro real. Feita para profissionais de estética."
                category="Planilha"
                status="available"
                badge="GRATUITO"
                badgeVariant="green"
                accent="orange"
                buttonText="Quero a planilha"
                onButtonClick={() => setLeadModalOpen(true)}
              />

              <ProductCard
                title="Calculadora de Precificação"
                description="Descubra o preço mínimo e o ideal para seus serviços, baseado nos seus custos reais."
                category="Calculadora"
                status="locked"
                badge="🔒 50 seguidores"
                badgeVariant="orange"
                accent="orange"
                popoverText="Será liberada quando o perfil @autonomiabr atingir 50 seguidores. Siga para não perder."
              />

              <ProductCard
                title="Diagnóstico de Negócio com IA"
                description="10 perguntas. A IA analisa e diz se seu negócio está pronto para crescer — e o que fazer."
                category="IA"
                status="locked"
                badge="🔒 200 seguidores"
                badgeVariant="orange"
                accent="purple"
                popoverText="Liberado com 200 seguidores em @autonomiabr."
              />

              <ProductCard
                title="Gerador de Resposta para Cliente Difícil"
                description="Descreva a situação. A IA escreve a mensagem certa para você enviar no WhatsApp."
                category="IA"
                status="locked"
                badge="🔒 300 seguidores"
                badgeVariant="orange"
                accent="pink"
                popoverText="Liberado com 300 seguidores em @autonomiabr."
              />

              <ProductCard
                title="Simulador de Faturamento"
                description="Quantos dias você trabalha? Quantos clientes por dia? Veja quanto pode faturar."
                category="Calculadora"
                status="locked"
                badge="🔒 500 seguidores"
                badgeVariant="orange"
                accent="orange"
                popoverText="Liberado com 500 seguidores em @autonomiabr."
              />

            </div>
          </section>

          {/* ── 2. PAGOS — USO ÚNICO ──────────────────────────────── */}
          <section className="mb-20">
            <SectionLabel>PAGOS — compre uma vez, use para sempre</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              <ProductCard
                title="Kit de Prompts para Gestão do Negócio"
                description="30+ prompts prontos organizados por situação: precificar, responder cliente, criar proposta, montar meta, analisar despesa."
                category="Prompts"
                status="coming-soon"
                badge="EM BREVE"
                badgeVariant="purple"
                accent="purple"
                popoverText="Em breve. Deixe seu e-mail para ser avisada no lançamento."
                showEmailCapture
              />

              <ProductCard
                title="Agente de Prospecção via WhatsApp"
                description="Configurado para o seu nicho. Aborda leads, qualifica e agenda automaticamente."
                category="Agente de IA"
                status="coming-soon"
                badge="EM BREVE"
                badgeVariant="purple"
                accent="purple"
                popoverText="Em breve. Acompanhe @autonomiabr para saber quando lançar."
              />

            </div>
          </section>

          {/* ── 3. PAGOS — ASSINATURA ─────────────────────────────── */}
          <section className="mb-20">
            <SectionLabel>ASSINATURA — gestão completa com IA</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              <ProductCard
                title="AutonomIA Estética"
                description="App de gestão + assistente Lia via WhatsApp. Registre atendimentos, despesas e agendamentos em linguagem natural."
                category="App"
                status="available"
                badge="DISPONÍVEL"
                badgeVariant="orange"
                accent="orange"
                buttonText="Conhecer o app"
                buttonHref="https://autonomiaapp.com.br"
              />

            </div>
          </section>

          {/* ── 4. SOB DEMANDA ────────────────────────────────────── */}
          <section className="mb-20">
            <SectionLabel>SOB DEMANDA — feito para o seu negócio</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              <ProductCard
                title="Agente de Atendimento Personalizado"
                description="Um assistente de IA configurado para o seu negócio específico — responde clientes, envia catálogo, agenda e cobra pelo WhatsApp."
                category="Agente de IA"
                status="sob-demanda"
                badge="SOB DEMANDA"
                badgeVariant="purple"
                accent="purple"
                popoverText="Interessada? Entre em contato pelo Instagram @autonomiabr"
                footerText="Seu atendente por 1 salário mínimo, parcelado em 12x"
              />

              <ProductCard
                title="Agente de Cobrança Automática"
                description="Sequência automática de mensagens para clientes com pagamento pendente — gentil, firme, eficaz."
                category="Agente de IA"
                status="sob-demanda"
                badge="SOB DEMANDA"
                badgeVariant="purple"
                accent="pink"
                popoverText="Interessada? Entre em contato pelo Instagram @autonomiabr"
              />

              <ProductCard
                title="Agente de Reativação de Clientes"
                description="Mensagens automáticas para clientes que sumiram, com oferta no momento certo."
                category="Agente de IA"
                status="sob-demanda"
                badge="SOB DEMANDA"
                badgeVariant="purple"
                accent="purple"
                popoverText="Interessada? Entre em contato pelo Instagram @autonomiabr"
              />

              <ProductCard
                title="Agente de Pós-venda"
                description="Pede avaliação, pergunta se quer reagendar, mantém o cliente na base automaticamente."
                category="Agente de IA"
                status="sob-demanda"
                badge="SOB DEMANDA"
                badgeVariant="purple"
                accent="pink"
                popoverText="Interessada? Entre em contato pelo Instagram @autonomiabr"
              />

            </div>
          </section>

        </div>
      </main>

      <Footer />

      <LeadModal
        open={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        onSuccess={handleLeadSuccess}
      />
    </>
  );
}
