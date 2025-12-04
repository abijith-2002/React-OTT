//
// Type-safe and robust access/guard utility functions.
//

/** PUBLIC_INTERFACE
 * safeGet - Safely retrieves a deeply nested property from an object by string path, with type and default fallback.
 *
 * @param obj The object to traverse
 * @param path String or array path, e.g., "a.b[0].c" or ["a","b",0,"c"]
 * @param defaultVal Value to return if access fails or type mismatches
 */
export function safeGet<T>(obj: unknown, path: string | Array<string | number>, defaultVal?: T): T | undefined {
  if (!obj || typeof obj !== 'object') return defaultVal;

  let segments: Array<string | number>;
  if (Array.isArray(path)) {
    segments = path;
  } else if (typeof path === 'string') {
    segments = path
      .replace(/\[(\d+)\]/g, '.$1')
      .split('.')
      .map(k => /^\d+$/.test(k) ? Number(k) : k);
  } else {
    return defaultVal;
  }

// Use unknown instead of any for current value
  let current: unknown = obj;
  for (const key of segments) {
    if (
      (typeof key === "number" && Array.isArray(current) && current.length > key) ||
      (typeof key === "string" &&
        !!current &&
        typeof current === "object" &&
        Object.prototype.hasOwnProperty.call(current, key))
    ) {
      // Type assertion needed for index access
      current = (current as Record<string | number, unknown>)[key];
    } else {
      return defaultVal;
    }
  }
  return current as T ?? defaultVal;
}

// PUBLIC_INTERFACE
/** Checks if the value is a non-empty array. */
export function isNonEmptyArray(val: unknown): val is unknown[] {
  return Array.isArray(val) && val.length > 0;
}

// PUBLIC_INTERFACE
/** Checks if value is a string. */
export function isString(val: unknown): val is string {
  return typeof val === "string";
}

// PUBLIC_INTERFACE
/** Checks if value is a (minimally structured) URL string. Simple pattern, not full RFC validation. */
export function isUrl(val: unknown): val is string {
  if (typeof val !== "string") return false;
  try {
    // Accepts http(s) and common streaming schemes
    return /^(https?|http|ftp|rtsp|rtmp):\/\/[^\s]+$/i.test(val);
  } catch {
    return false;
  }
}
