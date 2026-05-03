export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F5]/90 backdrop-blur-sm border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-syne font-extrabold text-xl text-brand-text tracking-tight">
            AutonomIA
          </span>
          <p className="text-xs text-brand-muted font-sans mt-0.5 hidden sm:block">
            Ferramentas de IA para quem trabalha sozinho
          </p>
        </div>
      </div>
    </header>
  );
}
