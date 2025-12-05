import { Platform } from "react-native";

/**
 * PUBLIC_INTERFACE
 * parseBoolean - Safely parse a string/boolean/number into a boolean.
 * Accepts: true/false, "true"/"false" (case-insensitive), "1"/"0", 1/0, "yes"/"no", "on"/"off".
 * Falls back to defaultVal (false unless specified) for undefined/empty/unknown inputs.
 */
export function parseBoolean(input: unknown, defaultVal = false): boolean {
  if (typeof input === "boolean") return input;
  if (typeof input === "number") return input !== 0;
  if (typeof input === "string") {
    const s = input.trim().toLowerCase();
    if (["true", "1", "yes", "y", "on"].includes(s)) return true;
    if (["false", "0", "no", "n", "off"].includes(s)) return false;
  }
  return defaultVal;
}

/**
 * PUBLIC_INTERFACE
 * parseJSON - Safe JSON.parse with default fallback.
 */
export function parseJSON<T = unknown>(input: unknown, defaultVal: T): T {
  if (typeof input !== "string" || input.trim() === "") return defaultVal;
  try {
    return JSON.parse(input) as T;
  } catch {
    return defaultVal;
  }
}

/**
 * PUBLIC_INTERFACE
 * getEnv - wrapper around process.env to facilitate testing and typed access.
 */
export function getEnv(name: string): string | undefined {
  // Expo public vars are injected at build-time; guard for undefined at runtime.
  // In web/Expo environments, process.env can exist but entries might be strings.
  // We return undefined for empty strings to emulate "unset".
  const v = (process.env as Record<string, string | undefined>)[name];
  return typeof v === "string" && v.trim() === "" ? undefined : v;
}

/**
 * PUBLIC_INTERFACE
 * AppConfig - Typed accessor for public configuration values.
 * Ensures boolean-like values are sanitized to booleans, and JSON strings are parsed safely.
 */
export const AppConfig = {
  // Boolean-ish
  trustProxy(): boolean {
    return parseBoolean(getEnv("EXPO_PUBLIC_TRUST_PROXY"), false);
  },
  experimentsEnabled(): boolean {
    return parseBoolean(getEnv("EXPO_PUBLIC_EXPERIMENTS_ENABLED"), false);
  },

  // Strings
  logLevel(): "debug" | "info" | "warn" | "error" {
    const raw = getEnv("EXPO_PUBLIC_LOG_LEVEL")?.toLowerCase();
    const allowed = new Set(["debug", "info", "warn", "error"]);
    if (raw && allowed.has(raw)) return raw as "debug" | "info" | "warn" | "error";
    return "info";
  },

  healthcheckPath(): string {
    const v = getEnv("EXPO_PUBLIC_HEALTHCHECK_PATH");
    // Normalize to a pathname beginning with slash
    if (!v) return "/health";
    return v.startsWith("/") ? v : `/${v}`;
  },

  // JSON blob of feature flags, e.g. {"newUI": true, "betaPlayer": "off"}
  // Values will remain as-is; use as needed. For boolean flags, use parseBoolean at call sites.
  featureFlags<T extends Record<string, unknown> = Record<string, unknown>>(): T {
    const raw = getEnv("EXPO_PUBLIC_FEATURE_FLAGS");
    return parseJSON<T>(raw, {} as T);
  },

  // Utility to read a flag from EXPO_PUBLIC_FEATURE_FLAGS as a boolean
  // with a per-flag default
  featureFlagBool(flagName: string, defaultVal = false): boolean {
    const flags = AppConfig.featureFlags<Record<string, unknown>>();
    return parseBoolean(flags?.[flagName], defaultVal);
  },

  // Example: derive a UI preference combining env and platform
  useEdgeToEdge(): boolean {
    // Prefer explicit feature flag, fallback to Android platform default if unset
    const ff = AppConfig.featureFlagBool("edgeToEdge", undefined as unknown as boolean);
    if (typeof ff === "boolean") return ff;
    return Platform.OS === "android"; // default aligns with app.json android.edgeToEdgeEnabled
  },
};
