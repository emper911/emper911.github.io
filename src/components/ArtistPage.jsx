import { useState, useMemo } from "react";
import { spacing } from "../tokens";
import {
  resolveContentType,
  getNavItems,
  applyVisibilityRules,
} from "../utils";
import { IdentityBlock } from "./IdentityBlock";
import { HeroCard } from "./HeroCard";
import { FeedCard } from "./FeedCard";
import { NavBar } from "./NavBar";
import { FilterIndicator } from "./FilterIndicator";

/**
 * ArtistPage — top-level page component.
 *
 * Props:
 *   siteConfig: config/site document
 *   schema: config/schema document
 *   contentByCollection: Record<string, Array<doc>>
 *     — keyed by Firestore collection name, values are arrays of documents
 *     — e.g. { shows: [...], music: [...], merchandise: [...], media: [...] }
 *   featuredItem: resolved document for siteConfig.featuredItem (or null)
 */
export function ArtistPage({
  siteConfig,
  schema,
  contentByCollection,
  featuredItem,
}) {
  const [activeFilter, setActiveFilter] = useState(null);

  // ─── Derive nav items from schema ───
  const navItems = useMemo(() => getNavItems(schema), [schema]);

  // ─── Build the feed ───
  const feed = useMemo(() => {
    const contentTypes = Object.entries(schema.contentTypes);

    if (activeFilter) {
      // Filtered: show only the selected content type
      const [, typeConfig] = contentTypes.find(
        ([key]) => key === activeFilter
      ) || [null, null];

      if (!typeConfig) return [];

      const items = contentByCollection[typeConfig.collection] || [];
      const visible = applyVisibilityRules(items, typeConfig.visibilityRules);

      // Sort by the type's sortField / sortDirection
      const sorted = [...visible].sort((a, b) => {
        const aVal = a[typeConfig.sortField];
        const bVal = b[typeConfig.sortField];
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return typeConfig.sortDirection === "asc" ? cmp : -cmp;
      });

      return sorted.map((item) => ({
        item,
        template: typeConfig.cardTemplate,
        typeLabel: typeConfig.label,
      }));
    }

    // Default: merge all visible items, sort by feedSortField desc
    const allItems = [];

    for (const [, typeConfig] of contentTypes) {
      const items = contentByCollection[typeConfig.collection] || [];
      const visible = applyVisibilityRules(items, typeConfig.visibilityRules);

      for (const item of visible) {
        allItems.push({
          item,
          template: typeConfig.cardTemplate,
          typeLabel: typeConfig.label,
          sortValue: item[typeConfig.feedSortField],
        });
      }
    }

    // Sort descending by feedSortField (newest first)
    allItems.sort((a, b) => {
      if (a.sortValue == null && b.sortValue == null) return 0;
      if (a.sortValue == null) return 1;
      if (b.sortValue == null) return -1;
      return a.sortValue > b.sortValue ? -1 : a.sortValue < b.sortValue ? 1 : 0;
    });

    return allItems;
  }, [schema, contentByCollection, activeFilter]);

  // ─── Resolve hero template ───
  const heroTemplate = useMemo(() => {
    if (!featuredItem || !siteConfig.featuredItem) return null;

    // Check for override
    if (siteConfig.featuredItem.heroTemplateOverride) {
      return siteConfig.featuredItem.heroTemplateOverride;
    }

    // Resolve from schema by collection
    const resolved = resolveContentType(
      siteConfig.featuredItem.collection,
      schema
    );
    return resolved?.config.heroTemplate || "media";
  }, [featuredItem, siteConfig, schema]);

  // ─── Filter toggle handler ───
  const handleFilterToggle = (key) => {
    setActiveFilter((prev) => (prev === key ? null : key));
  };

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Scrollable content area */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 56 }}>
        <IdentityBlock siteConfig={siteConfig} />

        {/* Hero card — only on feed (no filter active) */}
        {!activeFilter && featuredItem && heroTemplate && (
          <HeroCard item={featuredItem} template={heroTemplate} />
        )}

        {/* Filter indicator */}
        {activeFilter && (
          <FilterIndicator
            label={schema.contentTypes[activeFilter]?.label || activeFilter}
            onClear={() => setActiveFilter(null)}
          />
        )}

        {/* Feed */}
        <div style={{ padding: `6px ${spacing.pagePad}px 0` }}>
          {feed.map(({ item, template, typeLabel }, index) => (
            <FeedCard
              key={item.id || index}
              item={item}
              template={template}
              typeLabel={typeLabel}
            />
          ))}

          {feed.length === 0 && (
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--dim)",
                textAlign: "center",
                padding: "40px 0",
              }}
            >
              nothing here yet
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom nav */}
      <NavBar
        items={navItems}
        activeFilter={activeFilter}
        onFilterToggle={handleFilterToggle}
      />
    </div>
  );
}
