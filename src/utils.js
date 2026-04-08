// Format a price value. Returns null for null/-1, "free" for 0, "$X" otherwise.
export function formatPrice(price) {
  if (price == null || price === -1) return null;
  if (price === 0) return "free";
  return `$${price}`;
}

// Parse a date string (YYYY-MM-DD or ISO datetime) without timezone conversion.
// Always uses the date portion in the original timezone offset.
export function parseLocalDate(dateStr) {
  const datePart = dateStr.split("T")[0];
  const [y, m, d] = datePart.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Extract HH:MM from an ISO datetime string. Returns null for date-only strings.
export function formatTime(dateStr) {
  if (!dateStr || !dateStr.includes("T")) return null;
  const timePart = dateStr.split("T")[1];
  const match = timePart.match(/^(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : null;
}

// Format a time range from start/end date strings.
// Returns null if no time is present on start.
export function formatTimeRange(startStr, endStr) {
  const start = formatTime(startStr);
  if (!start) return null;
  const end = formatTime(endStr);
  return end ? `${start} – ${end}` : start;
}

/**
 * Format a date as "Jun 8, 2026"
 */
export function formatDate(dateStr) {
  return parseLocalDate(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format a date as month abbreviation, uppercase: "JUN"
 */
export function formatMonth(dateStr) {
  return parseLocalDate(dateStr)
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();
}

/**
 * Extract day number from date: 8
 */
export function formatDayNum(dateStr) {
  return parseLocalDate(dateStr).getDate();
}

/**
 * Format weekday abbreviated, uppercase: "MON"
 */
export function formatWeekday(dateStr) {
  return parseLocalDate(dateStr)
    .toLocaleDateString("en-US", { weekday: "short" })
    .toUpperCase();
}

/**
 * Relative time string: "3d ago", "2mo ago", "1y ago"
 * Future dates return the formatted date instead.
 */
export function timeAgo(dateStr) {
  const now = new Date();
  const then = parseLocalDate(dateStr);
  const days = Math.floor((now - then) / 86400000);

  if (days < 0) return formatDate(dateStr);
  if (days === 0) return "today";
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

/**
 * Determine CTA label from show itemType.
 */
export function ctaLabelForShowType(itemType) {
  switch (itemType) {
    case "stream":
    case "radio":
      return "Listen →";
    case "livestream":
      return "Watch →";
    case "ticket":
      return "Tickets →";
    default:
      return "Link →";
  }
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

  // "futureOnly" no longer hides past items — they are kept but visually dimmed in the UI.

  return filtered;
}

// Returns true if the item's date is strictly before today.
export function isPast(dateStr) {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseLocalDate(dateStr) < today;
}
