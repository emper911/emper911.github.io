import { useState, useMemo } from "react";
import { spacing } from "../tokens";
import { resolveContentType, applyVisibilityRules } from "../utils";
import { IdentityBlock } from "./IdentityBlock";
import { HeroCard } from "./HeroCard";
import { FeedCard } from "./FeedCard";
import { FilterTabs } from "./FilterTabs";

// Content types that get their own dedicated tab.
// Anything else in the schema rolls up into "Etc."
const PRIMARY_TAB_KEYS = new Set(["shows", "music", "merch"]);

export function ArtistPage({
  siteConfig,
  schema,
  contentByCollection,
  featuredItem,
}) {
  const [activeFilter, setActiveFilter] = useState("shows");
  const [activeSubFilter, setActiveSubFilter] = useState(null);

  // Reset sub-filter when switching away from etc.
  const handleFilterSelect = (key) => {
    setActiveFilter(key);
    if (key !== "etc") setActiveSubFilter(null);
  };

  // ─── Build full etc. pool (before sub-filter) ───
  const etcPool = useMemo(() => {
    if (activeFilter !== "etc") return [];
    const allItems = [];
    for (const [key, typeConfig] of Object.entries(schema.contentTypes)) {
      if (PRIMARY_TAB_KEYS.has(key)) continue;
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
    allItems.sort((a, b) => {
      if (a.sortValue == null && b.sortValue == null) return 0;
      if (a.sortValue == null) return 1;
      if (b.sortValue == null) return -1;
      return a.sortValue > b.sortValue ? -1 : a.sortValue < b.sortValue ? 1 : 0;
    });
    return allItems;
  }, [schema, contentByCollection, activeFilter]);

  // ─── Derive unique itemType values for etc. sub-tabs ───
  const etcSubTypes = useMemo(() => {
    const types = new Set(
      etcPool.map(({ item }) => item.itemType).filter(Boolean)
    );
    return [...types].sort();
  }, [etcPool]);

  // ─── Build the feed ───
  const feed = useMemo(() => {
    if (activeFilter === "etc") {
      if (!activeSubFilter) return etcPool;
      return etcPool.filter(({ item }) => item.itemType === activeSubFilter);
    }

    // Primary tab: show only that content type
    const typeConfig = schema.contentTypes[activeFilter];
    if (!typeConfig) return [];

    const items = contentByCollection[typeConfig.collection] || [];
    const visible = applyVisibilityRules(items, typeConfig.visibilityRules);

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
  }, [schema, contentByCollection, activeFilter, activeSubFilter, etcPool]);

  // ─── Resolve hero template ───
  const heroTemplate = useMemo(() => {
    if (!featuredItem || !siteConfig.featuredItem) return null;
    if (siteConfig.featuredItem.heroTemplateOverride) {
      return siteConfig.featuredItem.heroTemplateOverride;
    }
    const resolved = resolveContentType(
      siteConfig.featuredItem.collection,
      schema
    );
    return resolved?.config.heroTemplate || "media";
  }, [featuredItem, siteConfig, schema]);

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Fixed top section — does not scroll */}
      <IdentityBlock siteConfig={siteConfig} />

      {featuredItem && heroTemplate && (
        <HeroCard item={featuredItem} template={heroTemplate} />
      )}

      <FilterTabs
        activeFilter={activeFilter}
        onSelect={handleFilterSelect}
        etcSubTypes={etcSubTypes}
        activeSubFilter={activeSubFilter}
        onSubSelect={setActiveSubFilter}
      />

      {/* Scrollable feed */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: `6px ${spacing.pagePad}px 24px` }}>
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
    </div>
  );
}
