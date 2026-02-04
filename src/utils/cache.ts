type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

export const withCache = async <T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>
): Promise<T> => {
  const existing = cache.get(key);
  const now = Date.now();

  if (existing && existing.expiresAt > now) {
    return existing.value as T;
  }

  const value = await loader();
  cache.set(key, { value, expiresAt: now + ttlMs });
  return value;
};

export const clearCache = (prefix?: string) => {
  if (!prefix) {
    cache.clear();
    return;
  }

  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
};
