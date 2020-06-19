let started: boolean = false;
let startTime = 0;
interface TraceInterface {
  context?: string;
  key: string;
  target: any;
  args: unknown[];
}

function checkElapsed(
  before: number,
  threshold: number,
  trace: TraceInterface,
  response: unknown
): void {
  const after = performance.now();
  const elapsed = after - before;
  if (
    elapsed > threshold
    // &&
    // (trace.context === 'Combobox' ||
    //   trace.context === 'Select' ||
    //   trace.context === 'SelectOption' ||
    //   trace.context === 'SelectDropdown' ||
    //   trace.context === 'SelectDropdownOption' ||
    //   trace.context === 'SelectDropdownContent')
  ) {
    console.log('trace', `${performance.now() - startTime} ms`, 'ended', {
      elapsed,
      context: trace.context,
      key: trace.key,
      args: trace.args,
      response,
      target: trace.target,
    });
  }
}

/**
 * Caches the response of the decorated function for the given TTL
 * As for the TTL, you can provide it ay an argument
 * If it's not provided, `CACHE_TTL` environment variable will be used.
 * There is a 5sec fallback if there are no TTL provided
 *
 * @return {(target: any, key: string, descriptor: PropertyDescriptor) => void}
 * @constructor
 * @param threshold
 */
export function Trace(threshold: number = 10): Function {
  return function (target: any, key: string, descriptor: PropertyDescriptor): void {
    if (process.env.NODE_ENV === 'development') {
      const originalFn = descriptor.value;
      // stores the original function
      // check if the decorator is used on a function
      if (typeof descriptor.value === 'function') {
        // descriptor.value = memoize(originalFn, `@Memoize:${this.constructor.name}.${key}`, ttl)
        descriptor.value = function (...args: unknown[]): any {
          const trace: TraceInterface = {
            target,
            key,
            args,
          };
          if (this.constructor && this.constructor.name) {
            trace.context = this.constructor.name;
          }
          // if (
          //   trace.context === 'Combobox' ||
          //   trace.context === 'Select' ||
          //   trace.context === 'SelectOption' ||
          //   trace.context === 'SelectDropdown' ||
          //   trace.context === 'SelectDropdownOption' ||
          //   trace.context === 'SelectDropdownContent'
          // ) {
          if (!started) {
            startTime = performance.now();
            started = true;
          }
          // console.timeLog('trace', 'started', {
          //   context: trace.context,
          //   key: trace.key,
          //   args: trace.args,
          //   target: trace.target,
          // });
          // }
          const before = performance.now();
          const response = originalFn.apply(this, args);
          if (response && response.then && typeof response.then === 'function') {
            response.then((resp) => {
              checkElapsed(before, threshold, trace, resp);
            });
          } else {
            checkElapsed(before, threshold, trace, response);
          }
          return response;
        };
      } else {
        throw new Error('Only put a Memoize() decorator on a method.');
      }
    }
  };
}
