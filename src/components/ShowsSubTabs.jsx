import { spacing } from "../tokens";

const TABS = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
];

/**
 * Upcoming / Past sub-tabs, shown when the Shows filter is active.
 *
 * Props:
 *   active: "upcoming" | "past"
 *   onChange: (key) => void
 */
export function ShowsSubTabs({ active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: `12px ${spacing.pagePad}px 0` }}>
      {TABS.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            style={{
              background: "transparent",
              color: isActive ? "var(--fg)" : "var(--dim)",
              border: "none",
              borderBottom: `1.5px solid ${isActive ? "var(--fg)" : "transparent"}`,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              fontWeight: isActive ? 700 : 600,
              padding: "4px 2px",
              cursor: "pointer",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
