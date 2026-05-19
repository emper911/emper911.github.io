import { CTAButton } from "../primitives";
import { formatPrice } from "../../utils";

export function ReleaseCard({ item }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        {item.coverUrl && (
          <img
            src={item.coverUrl}
            alt={item.name}
            style={{ width: 48, height: 48, objectFit: "cover", flexShrink: 0 }}
          />
        )}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: -0.5,
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
            {formatPrice(item.price) != null && ` · ${formatPrice(item.price)}`}
          </div>
        </div>
      </div>
      {item.url && <CTAButton label="Listen →" href={item.url} />}
    </div>
  );
}
