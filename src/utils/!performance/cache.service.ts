interface CacheStore {
  [key: string]: { value: any; expireTime: number };
}
export const CACHE_TTL = 5000;

/**
 * Cache with a ttl, by default it is has a 5sec
 * It has a GC that will remove every item if the TTL is already expired
 *
 */
export class CacheService {
  private static instance: CacheService | null = null;

  private cache: CacheStore = {};
  private gcTimeout: number = CACHE_TTL;

  private constructor() {
    setInterval(() => {
      Object.entries(this.cache).forEach(([key, val]) => {
        if (val.expireTime < performance.now()) {
          delete this.cache[key];
        }
      });
    }, this.gcTimeout);
  }

  /**
   * Inserts an item to the cache with a ttl
   *
   * @param {string} cacheKey
   * @param value
   * @param {number} ttl
   */
  set<T>(cacheKey: string, value: T, ttl?: number): T {
    const expireTime: number =
      ttl && typeof ttl === 'number' ? performance.now() + ttl : performance.now() + CACHE_TTL;
    this.cache[cacheKey] = { value, expireTime };

    return value;
  }

  /**
   * Removes an item by key
   *
   * @param {string} cacheKey
   */
  remove(cacheKey: string): void {
    delete this.cache[cacheKey];
  }

  /**
   * Returns an item by key if it's still valid
   *
   * @param cacheKey
   * @return {{value?: *; hit: boolean}}
   */
  get<T>(cacheKey: string): { value?: T; hit: boolean } {
    if (this.cache[cacheKey] && this.cache[cacheKey].expireTime > performance.now()) {
      return {
        value: this.cache[cacheKey].value,
        hit: true,
      };
    }
    return {
      hit: false,
    };
  }

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }

    return CacheService.instance;
  }
}
