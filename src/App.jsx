// ─── App.jsx ───
//
// Entry point. Fetches config + content from Firestore,
// then renders the ArtistPage.
//
// Replace the mock data below with real Firestore calls.
// The component tree is ready to receive live data with no changes.

import { useState, useEffect } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { ArtistPage } from "./components/ArtistPage";

// ──────────────────────────────────────────────
// TODO: Replace with real Firestore fetchers
// ──────────────────────────────────────────────

async function fetchSiteConfig(/* db */) {
  // const doc = await getDoc(doc(db, "config", "site"));
  // return doc.data();
  return {
    artistName: "Midi Neutron",
    tagline: "live hardware · graphical scores · NYC",
    bio: null,
    theme: "dark",
    heroImageUrl: null,
    socialLinks: {
      bandcamp: "https://midineutron.bandcamp.com",
      instagram: "https://instagram.com/midineutron",
      soundcloud: "https://soundcloud.com/midineutron",
    },
    featuredItem: {
      collection: "shows",
      docId: "show-001",
    },
  };
}

async function fetchSchema(/* db */) {
  // const doc = await getDoc(doc(db, "config", "schema"));
  // return doc.data();
  return {
    contentTypes: {
      shows: {
        label: "Shows",
        showInNav: true,
        navOrder: 1,
        cardTemplate: "event",
        heroTemplate: "event",
        collection: "shows",
        sortField: "date",
        sortDirection: "asc",
        feedSortField: "date",
        visibilityRules: {
          hiddenStatuses: ["cancelled"],
          dateFilter: "futureOnly",
        },
      },
      music: {
        label: "Music",
        showInNav: true,
        navOrder: 2,
        cardTemplate: "release",
        heroTemplate: "release",
        collection: "music",
        sortField: "date",
        sortDirection: "desc",
        feedSortField: "date",
        visibilityRules: {
          hiddenStatuses: ["draft"],
        },
      },
      merch: {
        label: "Merch",
        showInNav: true,
        navOrder: 3,
        cardTemplate: "product",
        heroTemplate: "product",
        collection: "merchandise",
        sortField: "name",
        sortDirection: "asc",
        feedSortField: "date",
        visibilityRules: {
          hiddenStatuses: ["discontinued"],
        },
      },
      media: {
        label: "Media",
        showInNav: false,
        cardTemplate: "media",
        heroTemplate: "media",
        collection: "media",
        sortField: "date",
        sortDirection: "desc",
        feedSortField: "date",
        visibilityRules: {
          hiddenStatuses: ["draft"],
        },
      },
    },
  };
}

async function fetchAllContent(schema /*, db */) {
  // For each content type, fetch the collection:
  //   const snapshot = await getDocs(collection(db, collectionName));
  //   return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

  const collections = new Set(
    Object.values(schema.contentTypes).map((ct) => ct.collection)
  );

  // Mock data — replace with Firestore queries
  const mockData = {
    shows: [
      {
        id: "show-001",
        name: "Joy Guidry x Midi Neutron",
        itemType: "duo set",
        status: "upcoming",
        date: "2026-06-08",
        venue: { name: "The Jazz Gallery", address: "1160 Broadway, New York, NY 10001" },
        price: 20,
        url: "https://tickets.example.com",
        note: null,
      },
      {
        id: "show-002",
        name: "IDP Collective Session",
        itemType: "duo set",
        status: "upcoming",
        date: "2026-07-12",
        venue: { name: "Nublu" },
        price: 15,
        url: null,
        note: null,
      },
      {
        id: "show-003",
        name: "Electric Sunshine Residency",
        itemType: "radio set",
        status: "postponed",
        date: "2026-08-01",
        venue: { name: "Electric Sunshine" },
        price: null,
        url: null,
        note: null,
      },
    ],
    music: [
      {
        id: "music-001",
        name: "ikeru",
        itemType: "album",
        status: "published",
        date: "2024-03-01",
        coverUrl: null,
        price: 10,
        url: "https://midineutron.bandcamp.com/album/ikeru",
        note: null,
      },
      {
        id: "music-002",
        name: "signal/drift",
        itemType: "EP",
        status: "published",
        date: "2025-09-15",
        coverUrl: null,
        price: 7,
        url: "https://midineutron.bandcamp.com/album/signal-drift",
        note: null,
      },
    ],
    merchandise: [
      {
        id: "merch-001",
        name: "NFC Keychain",
        itemType: "keychain",
        status: "available",
        date: "2026-05-20",
        stock: 24,
        imageUrl: null,
        price: 12,
        url: null,
        stripePriceId: "price_abc123",
        note: null,
      },
      {
        id: "merch-002",
        name: "Midi Neutron Tee",
        itemType: "shirt",
        status: "coming_soon",
        date: "2026-04-01",
        stock: 0,
        imageUrl: null,
        price: 30,
        url: null,
        stripePriceId: null,
        note: null,
      },
      {
        id: "merch-003",
        name: "ikeru Vinyl",
        itemType: "vinyl",
        status: "sold_out",
        date: "2024-06-15",
        stock: 0,
        imageUrl: null,
        price: 25,
        url: null,
        stripePriceId: "price_def456",
        note: null,
      },
    ],
    media: [
      {
        id: "media-001",
        name: "IDP Live at Ki Smith",
        itemType: "video",
        status: "published",
        date: "2025-08-10",
        mediaUrl: null,
        url: "https://youtube.com/watch?v=example",
        note: "Full set recording from the gallery show",
      },
      {
        id: "media-002",
        name: "Graphical Score Generator",
        itemType: "project",
        status: "published",
        date: "2025-06-01",
        mediaUrl: null,
        url: "https://github.com/midineutron/score-gen",
        note: "Web tool for real-time graphical score generation",
      },
      {
        id: "media-003",
        name: "WFMU Radio Mix",
        itemType: "mix",
        status: "published",
        date: "2025-04-20",
        mediaUrl: null,
        url: "https://soundcloud.com/midineutron/wfmu-mix",
        note: "Live hardware set for freeform radio",
      },
    ],
  };

  const result = {};
  for (const coll of collections) {
    result[coll] = mockData[coll] || [];
  }
  return result;
}

async function fetchFeaturedItem(siteConfig, contentByCollection) {
  if (!siteConfig.featuredItem) return null;

  const { collection, docId } = siteConfig.featuredItem;
  const items = contentByCollection[collection] || [];
  return items.find((item) => item.id === docId) || null;

  // Real implementation:
  // const docRef = doc(db, collection, docId);
  // const snap = await getDoc(docRef);
  // return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ──────────────────────────────────────────────
// App
// ──────────────────────────────────────────────

export default function App() {
  const [siteConfig, setSiteConfig] = useState(null);
  const [schema, setSchema] = useState(null);
  const [content, setContent] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

        const featuredItem = await fetchFeaturedItem(site, allContent);
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
