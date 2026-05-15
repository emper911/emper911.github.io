import { useState, useMemo } from "react";
import { spacing } from "../tokens";
import { resolveContentType, applyVisibilityRules } from "../utils";
import { IdentityBlock } from "./IdentityBlock";
import { HeroCard } from "./HeroCard";
import { FeedCard } from "./FeedCard";
import { NavBar } from "./NavBar";
import { FilterIndicator } from "./FilterIndicator";
import { ShowsSubTabs } from "./ShowsSubTabs";
import { FilterTabs } from "./FilterTabs";

export function ArtistPage({
  siteConfig,
  schema,
  contentByCollection,
  featuredItem,
}) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [showsTab, setShowsTab] = useState("upcoming");
  const [activeSubFilter, setActiveSubFilter] = useState(null);

  // Reset sub-filter when switching away from etc.
  const handleFilterSelect = (key) => {
    setActiveFilter(key);
    if (key !== "etc") setActiveSubFilter(null);
  };

  // ─── etc pool (all visible items for the "etc" content type) ───
  const etcPool = useMemo(() => {
    const typeConfig = schema.contentTypes["etc"];
    if (!typeConfig) return [];
    const items = contentByCollection[typeConfig.collection] || [];
    const visible = applyVisibilityRules(items, typeConfig.visibilityRules);
    return visible.map((item) => ({
      item,
      template: typeConfig.cardTemplate,
      typeLabel: typeConfig.label,
    }));
  }, [schema, contentByCollection]);

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

    if (!activeFilter) return [];

    const typeConfig = schema.contentTypes[activeFilter];
    if (!typeConfig) return [];

    const items = contentByCollection[typeConfig.collection] || [];
    let visible = applyVisibilityRules(items, typeConfig.visibilityRules);
    let sortDirection = typeConfig.sortDirection;

    if (activeFilter === "shows") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isUpcoming = (item) =>
        !item.date || new Date(item.date) >= today;
      visible = visible.filter((item) =>
        showsTab === "past" ? !isUpcoming(item) : isUpcoming(item)
      );
      sortDirection = showsTab === "past" ? "desc" : "asc";
    }

    const sorted = [...visible].sort((a, b) => {
      const aVal = a[typeConfig.sortField];
      const bVal = b[typeConfig.sortField];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sortDirection === "asc" ? cmp : -cmp;
    });

    return sorted.map((item) => ({
      item,
      template: typeConfig.cardTemplate,
      typeLabel: typeConfig.label,
    }));
  }, [schema, contentByCollection, activeFilter, activeSubFilter, etcPool, showsTab]);

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

  // ─── Filter toggle handler ───
  const handleFilterToggle = (key) => {
    setActiveFilter((prev) => (prev === key ? null : key));
    setShowsTab("upcoming");
  };

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

        {/* Shows Upcoming / Past sub-tabs */}
        {activeFilter === "shows" && (
          <ShowsSubTabs active={showsTab} onChange={setShowsTab} />
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
  );
}
