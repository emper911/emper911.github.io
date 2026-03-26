import { CTAButton, StatusBadge } from "../primitives";

export function ProductCard({ item }) {
  const showBuy =
    item.status === "available" && item.stripePriceId && item.stock > 0;
  const showExternalLink =
    item.status === "available" && !item.stripePriceId && item.url;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 800,
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
          {item.status === "available" &&
            item.price != null &&
            ` · $${item.price} · ${item.stock} left`}
          {item.status === "sold_out" &&
            item.price != null &&
            ` · $${item.price}`}
        </div>
      </div>

      {showBuy && (
        <CTAButton
          label="Buy"
          variant="filled"
          onClick={() => {
            /* Stripe checkout integration point */
          }}
        />
      )}

      {showExternalLink && <CTAButton label="View →" href={item.url} />}

      {item.status === "sold_out" && (
        <StatusBadge variant="outlined">Sold out</StatusBadge>
      )}

      {item.status === "coming_soon" && (
        <StatusBadge variant="filled">Soon</StatusBadge>
      )}
    </div>
  );
}
