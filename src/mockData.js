// Local mock data — used in dev when VITE_USE_MOCK=true

export const mockSiteConfig = {
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
    docId: "show-1",
  },
};

export const mockSchema = {
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
      visibilityRules: { hiddenStatuses: ["cancelled", "draft"] },
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
      visibilityRules: { hiddenStatuses: ["draft"] },
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
      visibilityRules: { hiddenStatuses: ["discontinued"] },
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
      visibilityRules: { hiddenStatuses: ["draft"] },
    },
  },
};

export const mockContentByCollection = {
  shows: [
    { id: "show-1", name: "Knockdown Center", date: "2026-06-14T21:00:00", dateEnd: "2026-06-14T23:30:00", venue: { name: "Knockdown Center" }, price: 20, url: "https://example.com", status: "confirmed", ctaType: "tickets" },
    { id: "show-2", name: "Trans-Pecos Festival", date: "2026-07-04T22:00:00", venue: { name: "Trans-Pecos" }, price: 15, url: "https://example.com", status: "confirmed", ctaType: "tickets" },
    { id: "show-3", name: "Nowadays", date: "2026-08-20T23:00:00", venue: { name: "Nowadays" }, price: 0, url: "https://example.com", status: "confirmed", ctaType: "rsvp" },
    { id: "show-4", name: "Pioneer Works", date: "2026-09-12T19:30:00", venue: { name: "Pioneer Works" }, price: 25, url: "https://example.com", status: "confirmed", ctaType: "tickets" },
    { id: "show-5", name: "Le Poisson Rouge", date: "2026-10-03T20:00:00", venue: { name: "LPR" }, price: 18, url: "https://example.com", status: "confirmed", ctaType: "tickets" },
    { id: "show-past-1", name: "Elsewhere", date: "2025-11-08T22:00:00", venue: { name: "Elsewhere" }, price: 15, status: "confirmed" },
    { id: "show-past-2", name: "Good Room", date: "2025-09-21T23:00:00", venue: { name: "Good Room" }, price: 12, status: "confirmed" },
  ],
  music: [
    { id: "music-1", name: "Lattice Decay", date: "2025-03-01", itemType: "LP", coverUrl: null, url: "https://example.com", status: "published" },
    { id: "music-2", name: "Signal Paths", date: "2024-07-15", itemType: "EP", coverUrl: null, url: "https://example.com", status: "published" },
    { id: "music-3", name: "Feedback Fugue", date: "2024-01-20", itemType: "single", coverUrl: null, url: "https://example.com", status: "published" },
    { id: "music-4", name: "Resonant Forms", date: "2023-09-10", itemType: "LP", coverUrl: null, url: "https://example.com", status: "published" },
    { id: "music-5", name: "Oscillator Studies", date: "2023-02-14", itemType: "EP", coverUrl: null, url: "https://example.com", status: "published" },
    { id: "music-6", name: "Patch Notes", date: "2022-11-01", itemType: "single", coverUrl: null, url: "https://example.com", status: "published" },
  ],
  merchandise: [
    { id: "merch-1", name: "Lattice Decay Tee", itemType: "shirt", price: 35, status: "available", stock: 12, url: "https://example.com" },
    { id: "merch-2", name: "Logo Cap", itemType: "hat", price: 28, status: "available", stock: 5, url: "https://example.com" },
    { id: "merch-3", name: "Patch Bundle", itemType: "accessories", price: 15, status: "available", stock: -1, url: "https://example.com" },
    { id: "merch-4", name: "Resonant Forms Hoodie", itemType: "hoodie", price: 65, status: "sold_out", stock: 0 },
    { id: "merch-5", name: "Enamel Pin Set", itemType: "accessories", price: 12, status: "coming_soon" },
  ],
  media: [
    { id: "media-1", name: "Boiler Room NYC 2025", date: "2025-05-10", itemType: "video", url: "https://example.com", status: "published" },
    { id: "media-2", name: "RA Interview", date: "2025-02-20", itemType: "interview", note: "Resident Advisor", url: "https://example.com", status: "published" },
    { id: "media-3", name: "NTS Radio Session", date: "2024-11-15", itemType: "mix", url: "https://example.com", status: "published" },
  ],
};

export const mockFeaturedItem = mockContentByCollection.shows[0];
