import { DateBlock, CTAButton, StatusBadge } from "../primitives";
<<<<<<< HEAD
import { ctaLabelForShowType, formatTimeRange, formatPrice, isPast } from "../../utils";
=======
import { ctaLabelForShow } from "../../utils";
>>>>>>> 72451f5278e884eca77edcb7cd618a4c4a205350

export function EventCard({ item }) {
  const past = isPast(item.date);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0, opacity: past ? 0.4 : 1 }}>
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
<<<<<<< HEAD
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
=======
        )}

        {item.url && (
          <div style={{ marginTop: 8 }}>
            <CTAButton label={ctaLabelForShow(item.ctaType)} href={item.url} />
>>>>>>> 72451f5278e884eca77edcb7cd618a4c4a205350
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
