// src/seed.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

const site = {
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
    docId: "2c38e912-5ad2-8032-ace9-cb5ba7bb8989",
  },
};

const schema = {
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
      visibilityRules: { hiddenStatuses: ["cancelled", "draft"], dateFilter: "futureOnly" },
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

await setDoc(doc(db, "config", "site"), site);
console.log("config/site written");

await setDoc(doc(db, "config", "schema"), schema);
console.log("config/schema written");

console.log("Done. Exiting.");
process.exit(0);
