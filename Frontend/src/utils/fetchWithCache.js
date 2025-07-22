import axios from "axios";
import { getCache, setCache, clearCacheKey } from "../utils/cache.js";

export const fetchWithCache = async ({
  cacheKey,
  getUrl,
  postUrl,
  postPayload,
  setState,
  isOnline,
}) => {
  try {
    // 1. Show cache first
    const cached = await getCache(cacheKey);
    if (cached && typeof setState === "function") {
      setState(cached);
    }

    // 2. Then try to fetch fresh data if online
    if (isOnline) {
      const res = await axios.get(getUrl);
      const fresh = res.data;

      // 3. If fresh data is different from cache, update cache + state
      const isSame = cached && JSON.stringify(cached) === JSON.stringify(fresh);

      if (!isSame) {
        await clearCacheKey(cacheKey);
        await setCache(cacheKey, fresh);
        if (typeof setState === "function") {
          setState(fresh);
        }
      }

      if (postUrl && postPayload) {
        const alreadySynced = await getCache(`${cacheKey}-synced`);
        const payloadHash = JSON.stringify(postPayload);

        if (alreadySynced !== payloadHash) {
          try {
            await axios.post(postUrl, postPayload);
            await setCache(`${cacheKey}-synced`, payloadHash);
          } catch (err) {
            console.warn(`Failed to POST sync for ${cacheKey}`, err.message);
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error fetching ${cacheKey}:`, err);
  }
};
