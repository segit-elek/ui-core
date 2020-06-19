import { CacheService } from './cache.service';
import md5 from 'md5';

/**
 * Caches the response of the wrapped function for the given TTL
 * As for the TTL, you can provide it ay an argument
 * If it's not provided, `CACHE_TTL` environment variable will be used.
 * There is a 5sec fallback if there are no TTL provided
 *
 * @param {Function} originalFn
 * @param {number} ttl
 * @return {(target: any, key: string, descriptor: PropertyDescriptor) => void}
 * @constructor
 */
export function memoize<T>(
  originalFn: (...params: unknown[]) => T,
  ttl?: number
): (...params: unknown[]) => T {
  // init the cache
  const cache: CacheService = CacheService.getInstance();
  // check if the decorator is used on a function
  return function (...args: unknown[]): T {
    const cacheKey =
      `@Memoize:${originalFn.name || md5(originalFn.toString())}.` + JSON.stringify(args);
    // console.log('cacheKey', cacheKey);
    // check if the cache has the response
    const tmp = cache.get<T>(cacheKey);
    // if there is a hit, return the value
    if (tmp.hit) {
      return tmp.value;
    }

    // we only reach this point if the response wasn't cached
    // so it runs the original function and stores the response
    const response = originalFn.apply(this, args);

    // sets the response in the cache with a custom ttl is defined
    cache.set(cacheKey, response, ttl);

    return response;
  };
}

/**
 * Caches the response of the decorated function for the given TTL
 * As for the TTL, you can provide it ay an argument
 * If it's not provided, `CACHE_TTL` environment variable will be used.
 * There is a 5sec fallback if there are no TTL provided
 *
 * @param {number} ttl
 * @return {(target: any, key: string, descriptor: PropertyDescriptor) => void}
 * @constructor
 */
export function Memoize(ttl?: number): Function {
  return function (_target: any, key: string, descriptor: PropertyDescriptor): void {
    // stores the original function
    const originalFn = descriptor.value;
    // init the cache
    const cache: CacheService = CacheService.getInstance();
    // check if the decorator is used on a function
    if (typeof descriptor.value === 'function') {
      // descriptor.value = memoize(originalFn, `@Memoize:${this.constructor.name}.${key}`, ttl)
      descriptor.value = function (...args: unknown[]): any {
        // creates a cacheKey, it's prefixed with '@Memoize:' namespace
        const cacheKey = `@Memoize:${this.constructor.name}.${key}` + JSON.stringify(args);

        // check if the cache has the response
        const tmp = cache.get(cacheKey);
        // if there is a hit, return the value
        if (tmp.hit) {
          return tmp.value;
        }

        // we only reach this point if the response wasn't cached
        // so it runs the original function and stores the response
        const response = originalFn.apply(this, args);

        // sets the response in the cache with a custom ttl is defined
        cache.set(cacheKey, response, ttl);

        return response;
      };
    } else {
      throw new Error('Only put a Memoize() decorator on a method.');
    }
  };
}
