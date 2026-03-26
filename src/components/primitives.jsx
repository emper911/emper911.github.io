import { spacing } from "../tokens";
import { formatMonth, formatDayNum, formatWeekday } from "../utils";

/**
 * TypeBadge — small label showing content type.
 *
 * Props:
 *   label: string — display text (from schema contentType.label)
 */
export function TypeBadge({ label }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        fontWeight: 700,
        color: "var(--dim)",
        border: "1px solid var(--border)",
        padding: "1px 6px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

/**
 * StatusBadge — filled or outlined badge for item status.
 *
 * Props:
 *   children: string
 *   variant: "filled" | "outlined" | "warn"
 */
export function StatusBadge({ children, variant = "filled" }) {
  const styles = {
    filled: {
      background: "var(--fg)",
      color: "var(--bg)",
      border: "none",
    },
    outlined: {
      background: "transparent",
      color: "var(--dim)",
      border: "1px solid var(--dim)",
    },
    warn: {
      background: "var(--fg)",
      color: "var(--bg)",
      border: "none",
    },
  };

  return (
    <span
      style={{
        ...styles[variant],
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        fontWeight: 700,
        padding: "2px 7px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

/**
 * CTAButton — outlined or filled call-to-action.
 *
 * Props:
 *   label: string
 *   href: string | null — if set, renders <a>; otherwise <button>
 *   variant: "outlined" | "filled"
 *   onClick: function | null
 */
export function CTAButton({
  label,
  href = null,
  variant = "outlined",
  onClick = null,
}) {
  const base = {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    padding: "5px 14px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    lineHeight: 1.4,
  };

  const styles =
    variant === "filled"
      ? {
          ...base,
          background: "var(--fg)",
          color: "var(--bg)",
          border: "none",
          fontWeight: 700,
        }
      : {
          ...base,
          background: "transparent",
          color: "var(--fg)",
          border: "1px solid var(--fg)",
          fontWeight: 400,
        };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={styles}>
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} style={styles}>
      {label}
    </button>
  );
}

/**
 * HeroCTAButton — same as CTAButton but uses hero color tokens.
 */
export function HeroCTAButton({
  label,
  href = null,
  variant = "outlined",
  onClick = null,
}) {
  const base = {
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    padding: "6px 16px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
    lineHeight: 1.4,
  };

  const styles =
    variant === "filled"
      ? {
          ...base,
          background: "var(--hero-fg)",
          color: "var(--hero-bg)",
          border: "none",
          fontWeight: 700,
        }
      : {
          ...base,
          background: "transparent",
          color: "var(--hero-fg)",
          border: "1px solid var(--hero-fg)",
          fontWeight: 400,
        };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={styles}>
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} style={styles}>
      {label}
    </button>
  );
}

/**
 * DateBlock — calendar-style date display.
 * Used in event hero and event feed card.
 *
 * Props:
 *   dateStr: string
 *   size: "large" | "small"
 */
export function DateBlock({ dateStr, size = "large" }) {
  const isLarge = size === "large";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: isLarge ? 56 : 48,
        border: `1px solid ${isLarge ? "var(--hero-border)" : "var(--border)"}`,
        padding: isLarge ? "8px 6px" : "6px 4px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: isLarge ? 10 : 9,
          letterSpacing: 1.5,
          color: isLarge ? "var(--hero-dim)" : "var(--dim)",
        }}
      >
        {formatMonth(dateStr)}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: isLarge ? 32 : 26,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: -1,
        }}
      >
        {formatDayNum(dateStr)}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: isLarge ? "var(--hero-dim)" : "var(--dim)",
        }}
      >
        {formatWeekday(dateStr)}
      </div>
    </div>
  );
}
