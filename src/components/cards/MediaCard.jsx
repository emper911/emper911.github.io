import { CTAButton } from "../primitives";
import { ctaLabelForMediaType } from "../../utils";

export function MediaCard({ item }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: -0.3,
          }}
        >
          {item.name}
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--dim)",
            marginTop: 3,
          }}
        >
          {item.itemType}
          {item.note && ` — ${item.note}`}
        </div>
      </div>
      {item.url && (
        <CTAButton label={ctaLabelForMediaType(item.itemType)} href={item.url} />
      )}
    </div>
  );
}
