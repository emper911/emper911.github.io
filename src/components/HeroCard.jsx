import { useMemo } from "react";
import { spacing } from "../tokens";
import { DateBlock, HeroCTAButton } from "./primitives";

/**
 * HeroCard — dispatches to the correct hero template variant.
 *
 * Props:
 *   item: content document from Firestore
 *   template: "event" | "release" | "product" | "video" | "project" | "mix"
 */
export function HeroCard({ item, template }) {
  if (!item) return null;

  const variants = {
    event: HeroEvent,
    release: HeroRelease,
    product: HeroProduct,
    video: HeroVideo,
    project: HeroProject,
    mix: HeroMix,
  };

  const Variant = variants[template] || variants.event;

  return (
    <div style={{ padding: `${spacing.sectionGap}px ${spacing.pagePad}px 0` }}>
      <Variant item={item} />
    </div>
  );
}

// ─── Shared hero wrapper ───

function HeroWrapper({ sectionLabel, children }) {
  return (
    <div
      style={{
        background: "var(--hero-bg)",
        color: "var(--hero-fg)",
        padding: spacing.heroPad,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "var(--hero-dim)",
          marginBottom: 14,
        }}
      >
        {sectionLabel}
      </div>
      {children}
    </div>
  );
}

// ─── Hero: Event ───

function HeroEvent({ item }) {
  return (
    <HeroWrapper sectionLabel="Featured show">
      <div style={{ display: "flex", gap: 16 }}>
        <DateBlock dateStr={item.date} size="large" />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
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
              color: "var(--hero-dim)",
              marginTop: 6,
            }}
          >
            <div>@ {item.venue?.name || item.venue}</div>
            {item.price != null && <div>${item.price} admission</div>}
          </div>
          {item.url && (
            <div style={{ marginTop: 12 }}>
              <HeroCTAButton label="Tickets →" href={item.url} />
            </div>
          )}
        </div>
      </div>
    </HeroWrapper>
  );
}

// ─── Hero: Release ───

function HeroRelease({ item }) {
  return (
    <HeroWrapper sectionLabel="New release">
      {/* Cover art slot */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          background: item.coverUrl
            ? `url(${item.coverUrl}) center/cover`
            : "var(--hero-art-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          border: "1px solid var(--hero-border)",
        }}
      >
        {!item.coverUrl && (
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: -2,
              opacity: 0.2,
            }}
          >
            {item.name}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: -1,
              lineHeight: 1.1,
            }}
          >
            {item.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--hero-dim)",
              marginTop: 4,
            }}
          >
            {item.itemType}
            {item.date && ` · ${new Date(item.date).getFullYear()}`}
            {item.price != null && ` · $${item.price}`}
          </div>
        </div>
        {item.url && <HeroCTAButton label="Listen →" href={item.url} />}
      </div>
    </HeroWrapper>
  );
}

// ─── Hero: Product ───

function HeroProduct({ item }) {
  return (
    <HeroWrapper sectionLabel="Featured item">
      <div style={{ display: "flex", gap: 16 }}>
        <div
          style={{
            width: 100,
            height: 100,
            background: item.imageUrl
              ? `url(${item.imageUrl}) center/cover`
              : "var(--hero-art-bg)",
            border: "1px solid var(--hero-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {!item.imageUrl && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--hero-dim)",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {item.itemType}
            </span>
          )}
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: -0.5,
                lineHeight: 1.2,
              }}
            >
              {item.name}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--hero-dim)",
                marginTop: 4,
              }}
            >
              {item.itemType}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: -0.5,
              }}
            >
              {item.price != null ? `$${item.price}` : ""}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {item.stock > 0 && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--hero-dim)",
                  }}
                >
                  {item.stock} left
                </span>
              )}
              {item.status === "available" && item.stripePriceId && item.stock > 0 && (
                <HeroCTAButton label="Buy" variant="filled" />
              )}
              {item.status === "available" && !item.stripePriceId && item.url && (
                <HeroCTAButton label="View →" href={item.url} />
              )}
              {item.status === "sold_out" && (
                <HeroCTAButton label="Sold out" />
              )}
              {item.status === "coming_soon" && (
                <HeroCTAButton label="Soon" />
              )}
            </div>
          </div>
        </div>
      </div>
    </HeroWrapper>
  );
}

// ─── Hero: Video ───

function HeroVideo({ item }) {
  return (
    <HeroWrapper sectionLabel="Featured video">
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          background: "var(--hero-art-bg)",
          border: "1px solid var(--hero-border)",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Replace with iframe embed when mediaUrl/url available */}
        <div style={{ fontSize: 36, opacity: 0.2 }}>▶</div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: -0.5,
          lineHeight: 1.2,
        }}
      >
        {item.name}
      </div>
      {item.note && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--hero-dim)",
            marginTop: 6,
          }}
        >
          {item.note}
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        <HeroCTAButton label="Watch →" href={item.url} />
      </div>
    </HeroWrapper>
  );
}

// ─── Hero: Project ───

function HeroProject({ item }) {
  return (
    <HeroWrapper sectionLabel="Featured project">
      {item.note && (
        <div
          style={{
            border: "1px solid var(--hero-border)",
            padding: 14,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--hero-dim)",
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "var(--hero-fg)", opacity: 0.4 }}>{">"}</span>{" "}
            {item.note}
          </div>
        </div>
      )}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: -0.5,
          lineHeight: 1.2,
        }}
      >
        {item.name}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--hero-dim)",
          marginTop: 4,
        }}
      >
        {item.itemType}
        {item.date && ` · ${new Date(item.date).getFullYear()}`}
      </div>
      {item.url && (
        <div style={{ marginTop: 12 }}>
          <HeroCTAButton label="Demo →" href={item.url} />
        </div>
      )}
    </HeroWrapper>
  );
}

// ─── Hero: Mix ───

function HeroMix({ item }) {
  const barHeights = useMemo(
    () => Array.from({ length: 40 }, (_, i) => 20 + Math.sin(i * 0.5) * 30 + ((i * 7919) % 40)),
    []
  );

  return (
    <HeroWrapper sectionLabel="Featured mix">
      {/* Waveform placeholder — replace with real audio visualization */}
      <div
        style={{
          width: "100%",
          height: 48,
          background: "var(--hero-art-bg)",
          border: "1px solid var(--hero-border)",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            height: "100%",
            padding: "8px 12px",
          }}
        >
          {barHeights.map((h, i) => (
            <div
              key={i}
              style={{
                width: 3,
                background: "var(--hero-fg)",
                opacity: 0.15,
                height: `${h}%`,
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: -0.5,
          lineHeight: 1.2,
        }}
      >
        {item.name}
      </div>
      {item.note && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--hero-dim)",
            marginTop: 6,
          }}
        >
          {item.note}
        </div>
      )}
      {item.url && (
        <div style={{ marginTop: 12 }}>
          <HeroCTAButton label="Listen →" href={item.url} />
        </div>
      )}
    </HeroWrapper>
  );
}
