const TABS = [
  { key: "shows", label: "Shows" },
  { key: "music", label: "Music" },
  { key: "merch", label: "Merch" },
  { key: "etc", label: "Etc." },
];

export function FilterTabs({ activeFilter, onSelect, etcSubTypes, activeSubFilter, onSubSelect }) {
  return (
    <div style={{ flexShrink: 0 }}>
      {/* Main tabs */}
      <div
        style={{
          display: "flex",
          background: "var(--bg)",
          borderBottom: activeFilter === "etc" ? "none" : "1px solid var(--border)",
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

      {/* Etc. sub-tabs — horizontal scroll */}
      {activeFilter === "etc" && etcSubTypes.length > 0 && (
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <SubTab
            label="All"
            isActive={activeSubFilter === null}
            onClick={() => onSubSelect(null)}
          />
          {etcSubTypes.map((type) => (
            <SubTab
              key={type}
              label={type}
              isActive={activeSubFilter === type}
              onClick={() => onSubSelect(type)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SubTab({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: 1,
        textTransform: "uppercase",
        padding: "8px 16px",
        minHeight: 36,
        cursor: "pointer",
        background: "transparent",
        color: isActive ? "var(--fg)" : "var(--dim)",
        border: "none",
        borderBottom: `2px solid ${isActive ? "var(--fg)" : "transparent"}`,
        fontWeight: isActive ? 700 : 500,
        whiteSpace: "nowrap",
        transition: "color 0.12s ease, border-color 0.12s ease",
      }}
    >
      {label}
    </button>
  );
}
