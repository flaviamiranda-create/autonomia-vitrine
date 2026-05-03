export default function Footer() {
  return (
    <footer className="border-t border-brand-border mt-24 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-brand-muted font-sans">
        <span>© 2026 AutonomIA · Ferramentas de IA para microempreendedores</span>
        <a
          href="https://pro.autonomiaapp.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-orange transition-colors"
        >
          pro.autonomiaapp.com.br
        </a>
      </div>
    </footer>
  );
}
