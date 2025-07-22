import { openDB } from "idb";

const DB_NAME = "novellaCache";
const STORE_NAME = "homepageContent";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function setCache(key, data) {
  const db = await initDB();
  return db.put(STORE_NAME, data, key);
}

export async function getCache(key) {
  const db = await initDB();
  return db.get(STORE_NAME, key);
}

export async function clearCache() {
  const db = await initDB();
  return db.clear(STORE_NAME);
}

export async function clearCacheKey(key) {
  const db = await initDB();
  await db.delete(STORE_NAME, key);
  await db.delete(STORE_NAME, `${key}-synced`);
}
