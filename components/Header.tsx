export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F5]/90 backdrop-blur-sm border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-2.5" style={{ userSelect: "none" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <polygon points="50,2 98,50 50,98 2,50" fill="#FF4D1C" />
            <polygon points="50,18 82,50 50,82 18,50" fill="none" stroke="#F5F0EB" strokeWidth="4" />
            <circle cx="50" cy="18" r="5" fill="#F5F0EB" />
            <circle cx="82" cy="50" r="5" fill="#F5F0EB" />
            <circle cx="50" cy="82" r="5" fill="#F5F0EB" />
            <circle cx="18" cy="50" r="5" fill="#F5F0EB" />
            <polygon points="50,34 66,50 50,66 34,50" fill="#F5F0EB" />
          </svg>
          <span
            className="font-syne font-extrabold text-brand-orange"
            style={{ fontSize: "20px", letterSpacing: "-0.025em", lineHeight: 1 }}
          >
            AutonomIA
          </span>
        </div>
      </div>
    </header>
  );
}
