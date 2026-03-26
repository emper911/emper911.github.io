import { spacing } from "../tokens";
import { TypeBadge } from "./primitives";
import { formatDate, timeAgo } from "../utils";
import { EventCard } from "./cards/EventCard";
import { ReleaseCard } from "./cards/ReleaseCard";
import { ProductCard } from "./cards/ProductCard";
import { MediaCard } from "./cards/MediaCard";

/**
 * FeedCard — dispatches to the correct card template.
 *
 * Props:
 *   item: content document from Firestore
 *   template: "event" | "release" | "product" | "media"
 *   typeLabel: string — from schema contentType.label (for badge)
 */
export function FeedCard({ item, template, typeLabel }) {
  const templates = {
    event: EventCard,
    release: ReleaseCard,
    product: ProductCard,
    media: MediaCard,
  };

  const Template = templates[template] || templates.media;
  const isFuture = item.date && new Date(item.date) > new Date();
  const isPostponed = item.status === "postponed";

  return (
    <article
      style={{
        borderBottom: "1px solid var(--border)",
        padding: `${spacing.cardPadY}px 0`,
        opacity: isPostponed ? 0.4 : 1,
      }}
    >
      {/* Top row: badge + timestamp */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <TypeBadge label={typeLabel} />
        {item.date && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--dim)",
            }}
          >
            {isFuture ? formatDate(item.date) : timeAgo(item.date)}
          </span>
        )}
      </div>

      {/* Template-specific content */}
      <Template item={item} />
    </article>
  );
}
