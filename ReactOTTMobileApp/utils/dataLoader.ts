import { Video, Category, VideoMap, VideoList } from "../data/videoTypes";
import { isNonEmptyArray, isString } from "./safeGet";

// ----- Types -----

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

// ----- Video type validation -----

// PUBLIC_INTERFACE
/** Validation: ensures the object meets the Video interface contract. */
export function validateVideo(item: unknown): ValidationResult {
  const errors: string[] = [];

  if (!item || typeof item !== "object") {
    errors.push("item is not an object");
    return { ok: false, errors };
  }

  const videoObj = item as Record<string, unknown>;

  // id
  if (!isString(videoObj.id) || !videoObj.id.trim()) errors.push("id missing or not a string");
  // title
  if (!isString(videoObj.title) || !videoObj.title.trim()) errors.push("title missing or not a string");
  // description
  if (!isString(videoObj.description)) errors.push("description missing or not a string");
  // category (expect one of allowed)
  const allowedCats: string[] = ["Movies", "Sports", "News"];
  if (!isString(videoObj.category) || !allowedCats.includes(videoObj.category)) {
    errors.push("category missing or invalid");
  }
  // thumbnail
  if (!isString(videoObj.thumbnail) || !videoObj.thumbnail.startsWith("http")) {
    errors.push("thumbnail missing or invalid URL");
  }
  // banner
  if (!isString(videoObj.banner) || !videoObj.banner.startsWith("http")) {
    errors.push("banner missing or invalid URL");
  }
  // videoUrl (basic URL check)
  if (
    !isString(videoObj.videoUrl) ||
    (!videoObj.videoUrl.startsWith("http") &&
      !videoObj.videoUrl.startsWith("rtmp") &&
      !videoObj.videoUrl.startsWith("rtsp"))
  ) {
    errors.push("videoUrl missing or invalid URL");
  }

  return { ok: errors.length === 0, errors };
}

// ----- Loader -----

/**
 * Loads and validates mock video data, grouping by category.
 *
 * PUBLIC_INTERFACE
 * @returns { videosByCategory, allVideos, errors }
 */
export function loadVideos(): {
  videosByCategory: VideoMap;
  allVideos: VideoList;
  errors: string[];
} {
  // Prepare containers
  const categories: Category[] = ["Movies", "Sports", "News"];
  // Start with empty VideoMap
  const videosByCategory: VideoMap = {
    Movies: [],
    Sports: [],
    News: []
  };
  const allVideos: VideoList = [];
  const errors: string[] = [];

  // Try to read local JSON defensively to avoid crashing the app if JSON cannot be parsed or resolved.
  let mockData: unknown;
  try {
    // Use require to avoid TypeScript/tsconfig resolveJsonModule dependency and ensure Metro can bundle JSON.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    mockData = require("../data/mockVideos.json");
  } catch (e) {
    errors.push(`Failed to load mockVideos.json: ${(e as Error)?.message || "unknown error"}`);
    // Return empty structures with error message so UI can render fallback instead of freezing.
    return { videosByCategory, allVideos, errors };
  }

  if (!mockData || typeof mockData !== "object") {
    errors.push("mockVideos.json did not export an object");
    return { videosByCategory, allVideos, errors };
  }

  // Defensive: Accept keys in mockVideos (could be string-case differences or new categories)
  for (const key of Object.keys(mockData as Record<string, unknown>)) {
    // Normalize to category enum if possible
    const catEnum = categories.find(c => c.toLowerCase() === key.toLowerCase());
    // `unknown` type for property access
    const arr: unknown = (mockData as Record<string, unknown>)[key];
    if (!catEnum || !Array.isArray(arr)) {
      if (!catEnum) errors.push(`Warning: Unknown category "${key}" present in mock data`);
      continue;
    }
    for (const raw of arr) {
      const result = validateVideo(raw);
      if (result.ok) {
        (videosByCategory[catEnum] as Video[]).push(raw as Video);
        allVideos.push(raw as Video);
      } else {
        errors.push(`Invalid video in ${catEnum}: ${result.errors.join(", ")} (object: ${JSON.stringify(raw)})`);
      }
    }
  }

  // If categories are present but empty, provide a friendly fallback message.
  for (const cat of categories) {
    if (!isNonEmptyArray(videosByCategory[cat])) {
      errors.push(`No valid videos found for category: ${cat}`);
    }
  }
  return { videosByCategory, allVideos, errors };
}
