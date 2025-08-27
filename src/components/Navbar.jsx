import React from "react";

export default function Navbar({ activeSection, setActiveSection, variant = "desktop" }) {
  const sections = [
    { key: "about", label: "About" },
    { key: "resume", label: "Resume" },
    { key: "portfolio", label: "Portfolio" },
    { key: "contact", label: "Contact" },
  ];

  if (variant === "mobile") {
    // Bottom tab-style bar (full-width)
    return (
      <nav role="navigation" aria-label="Primary" className="w-full flex items-center justify-between gap-1">
        {sections.map(({ key, label }) => {
          const active = activeSection === key;
          return (
            <button key={key} onClick={() => setActiveSection(key)} aria-current={active ? "page" : undefined} className={["flex-1 min-w-0", "px-3 py-2 rounded-xl text-sm font-medium", "transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]", active ? "bg-gray-800 text-[hsl(var(--accent))]" : "text-gray-300 hover:text-white hover:bg-gray-800/60"].join(" ")}>
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  // Desktop compact floating box (your current style)
  return (
    <nav
      className="
        inline-flex items-center gap-3
        bg-gray-900 border-l border-b border-gray-800
        rounded-bl-xl rounded-tr-xl shadow-md
        px-4 py-3
      "
      role="navigation"
      aria-label="Primary"
    >
      {sections.map(({ key, label }) => {
        const active = activeSection === key;
        return (
          <button key={key} onClick={() => setActiveSection(key)} aria-current={active ? "page" : undefined} className={["px-4 py-2 rounded-lg text-base font-semibold transition", "focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]", active ? "bg-gray-800 text-[hsl(var(--accent))]" : "text-gray-300 hover:text-white hover:bg-gray-800/60"].join(" ")}>
            {label}
          </button>
        );
      })}
    </nav>
  );
}
