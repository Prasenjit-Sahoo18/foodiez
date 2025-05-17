type CacheEntry<T> = {
  data: T;
  expiry: number;
};

// Use a generic type for the cache object
const cache: Record<string, CacheEntry<unknown>> = {};

export function setCache<T>(key: string, data: T, ttl: number) {
  const expiry = Date.now() + ttl * 1000;
  cache[key] = { data, expiry };
}

export function getCache<T>(key: string): T | undefined {
  const entry = cache[key];
  if (!entry) return undefined;
  if (Date.now() > entry.expiry) {
    delete cache[key];
    return undefined;
  }
  return entry.data as T;
}