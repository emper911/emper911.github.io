import { DateBlock, CTAButton, StatusBadge } from "../primitives";
import { ctaLabelForShowType, formatTimeRange, formatPrice } from "../../utils";

export function EventCard({ item }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
        {item.date && <DateBlock dateStr={item.date} size="small" />}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: -0.3,
              lineHeight: 1.25,
            }}
          >
            {item.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--dim)",
              marginTop: 4,
            }}
          >
            {formatTimeRange(item.date, item.dateEnd) && (
              <span>{formatTimeRange(item.date, item.dateEnd)} · </span>
            )}
            @ {item.venue?.name || item.venue}
            {formatPrice(item.price) != null && ` · ${formatPrice(item.price)}`}
          </div>
          {item.status === "postponed" && (
            <div style={{ marginTop: 4 }}>
              <StatusBadge variant="filled">Postponed</StatusBadge>
            </div>
          )}
        </div>
      </div>

      {item.status === "upcoming" && item.url && (
        <CTAButton label={ctaLabelForShowType(item.itemType)} href={item.url} />
      )}
    </div>
  );
}
