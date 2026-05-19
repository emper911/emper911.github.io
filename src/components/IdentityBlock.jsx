import { spacing } from "../tokens";
import { SocialIcon } from "./SocialIcon";

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
        <nav style={{ marginTop: 10, display: "flex", gap: 14 }}>
          {Object.entries(socialLinks).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={platform}
              style={{ color: "var(--dim)", display: "flex", alignItems: "center" }}
            >
              <SocialIcon platform={platform} size={16} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
