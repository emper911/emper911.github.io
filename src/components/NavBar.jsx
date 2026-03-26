import { spacing } from "../tokens";

/**
 * Sticky bottom filter bar.
 *
 * Props:
 *   items: Array<{ key: string, label: string }>  — from getNavItems(schema)
 *   activeFilter: string | null  — currently active filter key
 *   onFilterToggle: (key: string) => void
 */
export function NavBar({ items, activeFilter, onFilterToggle }) {
  return (
    <nav
      style={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--nav-bg)",
        borderTop: "2px solid var(--nav-idle-border)",
        display: "flex",
        gap: spacing.navGap,
        padding: spacing.navPad,
        zIndex: 10,
        /* Safe area for notched devices */
        paddingBottom: `max(12px, env(safe-area-inset-bottom))`,
      }}
    >
      {items.map(({ key, label }) => (
        <NavButton
          key={key}
          label={label}
          isActive={activeFilter === key}
          onClick={() => onFilterToggle(key)}
        />
      ))}
    </nav>
  );
}

function NavButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      style={{
        background: isActive ? "var(--nav-active-bg)" : "var(--nav-idle-bg)",
        color: isActive ? "var(--nav-active-fg)" : "var(--nav-idle-fg)",
        border: isActive ? "none" : "1.5px solid var(--nav-idle-border)",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        padding: "9px 0",
        letterSpacing: 1.2,
        textTransform: "uppercase",
        cursor: "pointer",
        flex: 1,
        fontWeight: isActive ? 700 : 600,
        transition: "all 0.12s ease",
        /* Minimum touch target */
        minHeight: 44,
      }}
    >
      {label}
    </button>
  );
}
