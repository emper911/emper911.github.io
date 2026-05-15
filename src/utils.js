/**
 * Format a date as "Jun 8, 2026"
 */
export function formatDate(dateStr) {
  const dt = new Date(dateStr);
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format a date as month abbreviation, uppercase: "JUN"
 */
export function formatMonth(dateStr) {
  const dt = new Date(dateStr);
  return dt
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
}

/**
 * Extract day number from date: 8
 */
export function formatDayNum(dateStr) {
  return new Date(dateStr).getDate();
}

/**
 * Format weekday abbreviated, uppercase: "MON"
 */
export function formatWeekday(dateStr) {
  const dt = new Date(dateStr);
  return dt
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
}

/**
 * Relative time string: "3d ago", "2mo ago", "1y ago"
 * Future dates return the formatted date instead.
 */
export function timeAgo(dateStr) {
  const now = new Date();
  const then = new Date(dateStr);
  const days = Math.floor((now - then) / 86400000);

  if (days < 0) return formatDate(dateStr);
  if (days === 0) return "today";
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

/**
 * Determine CTA label from media itemType.
 */
export function ctaLabelForMediaType(itemType) {
  switch (itemType) {
    case "video":
      return "Watch →";
    case "mix":
    case "playlist":
      return "Listen →";
    case "project":
      return "View →";
    case "photo":
      return "View →";
    default:
      return "View →";
  }
}

/**
 * Determine CTA label for a show from its cta-type.
 * Artist sets cta-type in Notion (e.g. "ticket" before, "watch" once recorded).
 */
export function ctaLabelForShow(ctaType) {
  switch (ctaType) {
    case "stream":
      return "Stream →";
    case "watch":
      return "Watch →";
    case "listen":
      return "Listen →";
    case "ticket":
    default:
      return "Tickets →";
  }
}

/**
 * Resolve which content type a document belongs to,
 * given its source collection and the schema config.
 * Returns the content type key and config object.
 */
export function resolveContentType(collection, schema) {
  const entries = Object.entries(schema.contentTypes);
  for (const [key, config] of entries) {
    if (config.collection === collection) {
      return { key, config };
    }
  }
  return null;
}

/**
 * Get nav items from schema, sorted by navOrder.
 */
export function getNavItems(schema) {
  return Object.entries(schema.contentTypes)
    .filter(([, config]) => config.showInNav)
    .sort(([, a], [, b]) => a.navOrder - b.navOrder)
    .map(([key, config]) => ({
      key,
      label: config.label,
      collection: config.collection,
    }));
}

/**
 * Apply visibility rules to filter out hidden items.
 */
export function applyVisibilityRules(items, rules) {
  if (!rules) return items;

  let filtered = items;

  if (rules.hiddenStatuses?.length) {
    filtered = filtered.filter(
      (item) => !rules.hiddenStatuses.includes(item.status)
    );
  }

  if (rules.dateFilter === "futureOnly") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    filtered = filtered.filter((item) => {
      if (!item.date) return true;
      return new Date(item.date) >= today;
    });
  }

  return filtered;
}
