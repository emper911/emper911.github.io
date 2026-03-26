// functions/src/index.js
import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { createHmac } from "crypto";
import { getCollection, transformPage } from "./transform.js";

initializeApp();
const db = getFirestore();

const NOTION_DB_ID = "2c18e912-5ad2-8034-81c1-f83657c10ffe";
const NOTION_VERSION = "2022-06-28";

async function notionGet(path, apiToken) {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Notion-Version": NOTION_VERSION,
    },
  });
  if (!res.ok) throw new Error(`Notion API error: ${res.status} ${await res.text()}`);
  return res.json();
}

async function notionQuery(dbId, apiToken, startCursor = undefined) {
  const body = { page_size: 100 };
  if (startCursor) body.start_cursor = startCursor;
  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Notion query error: ${res.status} ${await res.text()}`);
  return res.json();
}

async function writeToFirestore(doc) {
  const { collection, id, ...data } = doc;
  await db.collection(collection).doc(id).set(data, { merge: true });
}

// ── Webhook sync function ──
export const notionSync = onRequest(
  { region: "us-east1", secrets: ["NOTION_API_TOKEN", "NOTION_WEBHOOK_SECRET"] },
  async (req, res) => {
    // Signature verification (skip if secret not yet configured)
    const webhookSecret = process.env.NOTION_WEBHOOK_SECRET;
    if (webhookSecret) {
      const sig = req.headers["x-notion-signature"];
      if (!sig) return res.status(401).send("Missing signature");
      const expected = createHmac("sha256", webhookSecret)
        .update(JSON.stringify(req.body))
        .digest("hex");
      if (sig !== `sha256=${expected}`) return res.status(401).send("Invalid signature");
    } else {
      console.warn("NOTION_WEBHOOK_SECRET not set — skipping signature verification");
    }

    // Extract page ID (handle both Notion webhook payload formats)
    const pageId = req.body?.entity?.id ?? req.body?.data?.page_id;
    if (!pageId) return res.status(400).send("Missing page ID");

    try {
      const apiToken = process.env.NOTION_API_TOKEN;
      const page = await notionGet(`/pages/${pageId}`, apiToken);
      const doc = transformPage(page.id, page.properties);

      if (!doc) {
        console.warn(`Unknown data-type for page ${pageId} — skipping`);
        return res.status(200).send("Skipped: unknown data-type");
      }

      await writeToFirestore(doc);
      console.log(`Synced ${doc.collection}/${doc.id}`);
      res.status(200).send("OK");
    } catch (err) {
      console.error("Sync error:", err);
      res.status(500).send("Internal error");
    }
  }
);

// ── Backfill function ──
export const backfill = onRequest(
  { region: "us-east1", secrets: ["NOTION_API_TOKEN"], timeoutSeconds: 120 },
  async (req, res) => {
    const apiToken = process.env.NOTION_API_TOKEN;
    let total = 0, written = 0, skipped = 0;
    const errors = [];
    let cursor = undefined;

    try {
      do {
        const result = await notionQuery(NOTION_DB_ID, apiToken, cursor);
        for (const page of result.results) {
          total++;
          try {
            const doc = transformPage(page.id, page.properties);
            if (!doc) { skipped++; continue; }
            await writeToFirestore(doc);
            written++;
          } catch (err) {
            errors.push({ id: page.id, error: err.message });
          }
        }
        cursor = result.has_more ? result.next_cursor : undefined;
      } while (cursor);

      console.log(`Backfill complete: ${written} written, ${skipped} skipped, ${errors.length} errors`);
      res.status(200).json({ total, written, skipped, errors });
    } catch (err) {
      console.error("Backfill error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);
