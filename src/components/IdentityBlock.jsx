import { spacing } from "../tokens";

/**
 * Artist identity header.
 *
 * Props:
 *   siteConfig: {
 *     artistName: string,
 *     tagline: string | null,
 *     socialLinks: Record<string, string> | null,
 *   }
 */
export function IdentityBlock({ siteConfig }) {
  const { artistName, tagline, socialLinks } = siteConfig;

  return (
    <header style={{ padding: `28px ${spacing.pagePad}px 0` }}>
      {/* Artist name */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 42,
          fontWeight: 900,
          letterSpacing: -2,
          lineHeight: 0.92,
          textTransform: "uppercase",
          color: "var(--fg)",
          margin: 0,
        }}
      >
        {artistName}
      </h1>

      {/* Tagline */}
      {tagline && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--dim)",
            letterSpacing: 0.5,
            marginTop: 10,
            marginBottom: 0,
          }}
        >
          {tagline}
        </p>
      )}

      {/* Social links */}
      {socialLinks && Object.keys(socialLinks).length > 0 && (
        <nav
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--dim)",
            marginTop: 6,
            display: "flex",
            gap: 12,
          }}
        >
          {Object.entries(socialLinks).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "inherit",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
                paddingBottom: 1,
              }}
            >
              {platform}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
