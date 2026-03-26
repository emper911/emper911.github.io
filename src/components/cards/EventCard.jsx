import { DateBlock, CTAButton, StatusBadge } from "../primitives";

export function EventCard({ item }) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      {item.date && <DateBlock dateStr={item.date} size="small" />}
      <div style={{ flex: 1 }}>
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
          @ {item.venue?.name || item.venue}
          {item.price != null ? ` · $${item.price}` : " · free"}
        </div>

        {item.status === "postponed" && (
          <div style={{ marginTop: 4 }}>
            <StatusBadge variant="filled">Postponed</StatusBadge>
          </div>
        )}

        {item.status === "upcoming" && item.url && (
          <div style={{ marginTop: 8 }}>
            <CTAButton label="tickets →" href={item.url} />
          </div>
        )}
      </div>
    </div>
  );
}
