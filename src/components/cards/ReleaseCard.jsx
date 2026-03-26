import { CTAButton } from "../primitives";

export function ReleaseCard({ item }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: -0.5,
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
          {item.price != null && ` · $${item.price}`}
        </div>
      </div>
      {item.url && <CTAButton label="Listen →" href={item.url} />}
    </div>
  );
}
