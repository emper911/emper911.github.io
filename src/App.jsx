import { useState, useEffect } from "react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";
import { ThemeProvider } from "./components/ThemeProvider";
import { ArtistPage } from "./components/ArtistPage";
import { mockSiteConfig, mockSchema, mockContentByCollection, mockFeaturedItem } from "./mockData";

const USE_MOCK = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === "true";

async function fetchSiteConfig() {
  const snap = await getDoc(doc(db, "config", "site"));
  if (!snap.exists()) throw new Error("config/site not found");
  return snap.data();
}

async function fetchSchema() {
  const snap = await getDoc(doc(db, "config", "schema"));
  if (!snap.exists()) throw new Error("config/schema not found");
  return snap.data();
}

async function fetchAllContent(schema) {
  const collections = new Set(
    Object.values(schema.contentTypes).map((ct) => ct.collection)
  );
  const result = {};
  await Promise.all(
    [...collections].map(async (collName) => {
      const snap = await getDocs(collection(db, collName));
      result[collName] = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((d) => d.status !== "draft");
    })
  );
  return result;
}

async function fetchFeaturedItem(siteConfig) {
  if (!siteConfig.featuredItem) return null;
  const { collection: collName, docId } = siteConfig.featuredItem;
  const snap = await getDoc(doc(db, collName, docId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export default function App() {
  const [siteConfig, setSiteConfig] = useState(null);
  const [schema, setSchema] = useState(null);
  const [content, setContent] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (USE_MOCK) {
      setSiteConfig(mockSiteConfig);
      setSchema(mockSchema);
      setContent(mockContentByCollection);
      setFeatured(mockFeaturedItem);
      setLoading(false);
      return;
    }

    async function init() {
      try {
        const [site, sch] = await Promise.all([
          fetchSiteConfig(),
          fetchSchema(),
        ]);
        setSiteConfig(site);
        setSchema(sch);
        const allContent = await fetchAllContent(sch);
        setContent(allContent);
        const featuredItem = await fetchFeaturedItem(site);
        setFeatured(featuredItem);
      } catch (err) {
        console.error("Failed to load site data:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (loading || !siteConfig || !schema || !content) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0e0d0b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#666",
        }}
      >
        loading...
      </div>
    );
  }

  return (
    <ThemeProvider theme={siteConfig.theme}>
      <ArtistPage
        siteConfig={siteConfig}
        schema={schema}
        contentByCollection={content}
        featuredItem={featured}
      />
    </ThemeProvider>
  );
}
