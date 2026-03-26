import { spacing } from "../tokens";

export function FilterIndicator({ label, onClear }) {
  return (
    <div style={{ padding: `16px ${spacing.pagePad}px 0`, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", letterSpacing: 1.5, textTransform: "uppercase" }}>
      Showing {label} ·{" "}
      <span onClick={onClear} style={{ cursor: "pointer", borderBottom: "1px dotted var(--dim)" }} role="button" tabIndex={0}>
        clear
      </span>
    </div>
  );
}
