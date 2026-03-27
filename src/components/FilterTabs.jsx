const TABS = [
  { key: "shows", label: "Shows" },
  { key: "music", label: "Music" },
  { key: "merch", label: "Merch" },
  { key: "etc", label: "Etc." },
];

export function FilterTabs({ activeFilter, onSelect }) {
  return (
    <div
      style={{
        display: "flex",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        flexShrink: 0,
      }}
    >
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          aria-pressed={activeFilter === key}
          style={{
            flex: 1,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            padding: "10px 0",
            minHeight: 44,
            cursor: "pointer",
            background: "transparent",
            color: activeFilter === key ? "var(--fg)" : "var(--dim)",
            border: "none",
            borderBottom: `2px solid ${activeFilter === key ? "var(--fg)" : "transparent"}`,
            fontWeight: activeFilter === key ? 700 : 500,
            transition: "color 0.12s ease, border-color 0.12s ease",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
