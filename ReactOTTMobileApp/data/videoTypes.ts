//
// Types and interfaces for video browsing OTT data model.
//

// PUBLIC_INTERFACE
/**
 * Category - Enumerated categories for the OTT app: Movies, Sports, News.
 */
export type Category = "Movies" | "Sports" | "News";

// PUBLIC_INTERFACE
/**
 * Video - Represents a single video item (movie, sports stream, or news clip).
 */
export interface Video {
  id: string; // Unique UUID string
  title: string;
  description: string;
  category: Category;
  thumbnail: string; // Image URL (local asset or web)
  banner: string;    // Banner image URL (local asset or web, can be same as thumbnail)
  videoUrl: string;  // Playable MP4/HLS URL
}

// Option 1: Map by category (recommended for grouping)
export type VideoMap = {
  [key in Category]: Video[];
};

// Option 2: Flat array of all videos if you want not to group
export type VideoList = Video[];
