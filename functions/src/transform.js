// functions/src/transform.js

const COLLECTION_MAP = {
  show: "shows",
  music: "music",
  merchandise: "merchandise",
  media: "media",
};

export function getCollection(dataType) {
  return COLLECTION_MAP[dataType] ?? null;
}

function extractTitle(props) {
  return props.Name?.title?.[0]?.plain_text ?? null;
}

function extractSelect(props, field) {
  return props[field]?.select?.name ?? null;
}

function extractDate(props) {
  return props.date?.date?.start ?? null;
}

function extractUrl(props) {
  return props.url?.url ?? null;
}

function extractNumber(props, field) {
  return props[field]?.number ?? null;
}

function extractText(props, field) {
  return props[field]?.rich_text?.[0]?.plain_text ?? null;
}

function extractFile(props) {
  const files = props.media?.files ?? [];
  if (!files.length) return null;
  const f = files[0];
  return f.file?.url ?? f.external?.url ?? null;
}

function extractPlace(props) {
  const place = props.place?.place;
  if (!place) return { name: null, address: null, lat: null, lng: null };
  return {
    name: place.name ?? null,
    address: place.formatted_address ?? null,
    lat: place.location?.latitude ?? null,
    lng: place.location?.longitude ?? null,
  };
}

export function transformPage(pageId, properties) {
  const dataType = extractSelect(properties, "data-type");
  const collection = getCollection(dataType);
  if (!collection) return null;

  const shared = {
    id: pageId,
    name: extractTitle(properties),
    itemType: extractSelect(properties, "item-type"),
    status: extractSelect(properties, "status"),
    date: extractDate(properties),
    url: extractUrl(properties),
    note: extractText(properties, "note"),
    syncedAt: new Date().toISOString(),
  };

  switch (dataType) {
    case "show": {
      const venue = extractPlace(properties);
      return {
        ...shared,
        collection,
        venue,
        price: extractNumber(properties, "price"),
      };
    }
    case "music":
      return {
        ...shared,
        collection,
        coverUrl: extractFile(properties),
        price: extractNumber(properties, "price"),
      };
    case "merchandise":
      return {
        ...shared,
        collection,
        imageUrl: extractFile(properties),
        price: extractNumber(properties, "price"),
        stock: extractNumber(properties, "stock"),
        stripePriceId: extractText(properties, "stripePriceId"),
      };
    case "media":
      return {
        ...shared,
        collection,
        mediaUrl: extractFile(properties),
      };
    default:
      return null;
  }
}
