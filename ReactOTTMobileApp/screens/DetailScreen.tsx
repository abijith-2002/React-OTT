import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { loadVideos } from "../utils/dataLoader";
import type { Video } from "../data/videoTypes";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorBoundary from "../components/ErrorBoundary";
import Colors, { Sizing } from "../theme/theme";

// -- Constants
const SCREEN_WIDTH = Dimensions.get("window").width;

// -- Helper: video lookup by id
function findVideoById(videoId: string, allVideos: Video[]): Video | undefined {
  return allVideos.find((vid) => vid.id === videoId);
}

// PUBLIC_INTERFACE
/**
 * DetailScreen - Shows details for a single video item.
 * Displays: banner/thumbnail, title, description, category.
 * Includes area for VideoPlayer (to be added), and full error handling.
 * Handles missing/invalid params and data gracefully, uses theme/utility imports, and fits navigation contract.
 */
export default function DetailScreen() {
  // Route and navigation setup
  const route =
    useRoute<RouteProp<RootStackParamList, "Detail">>();
  // Navigation hook initialized but not currently used; removed to resolve lint error.

  // Get navigation params (may be undefined)
  const videoId = route.params?.videoId;

  // Load data only once
  const { allVideos, errors: dataErrors } = loadVideos();

  // UI State: handle param/data error, missing video, etc.
  let video: Video | undefined = undefined;
  let errorMsg: string | undefined = undefined;

  if (!videoId || typeof videoId !== "string") {
    errorMsg = "Video ID missing in navigation parameters.";
  } else if (dataErrors.length > 0 || !allVideos || allVideos.length === 0) {
    errorMsg = "Error loading video data. Please try again later.";
  } else {
    video = findVideoById(videoId, allVideos);
    if (!video) {
      errorMsg = "Could not find video with the requested ID.";
    }
  }

  // Banner image fallback
  const bannerSrc =
    video && typeof video.banner === "string" && video.banner.startsWith("http")
      ? { uri: video.banner }
      : undefined;

  // Render section
  return (
    <ErrorBoundary>
      <View style={styles.screen}>
        {!errorMsg && !video ? (
          <LoadingIndicator />
        ) : errorMsg ? (
          <View style={styles.errorBlock}>
            <Text style={styles.errorTitle}>Error</Text>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollArea}>
            {/* Banner image */}
            <View style={styles.bannerWrap}>
              {bannerSrc ? (
                <Image
                  source={bannerSrc}
                  style={styles.banner}
                  resizeMode="cover"
                  accessibilityLabel={`Banner image for ${video?.title || "video"}`}
                  accessibilityIgnoresInvertColors
                />
              ) : (
                <View style={styles.bannerPlaceholder}>
                  <Text style={styles.bannerPlaceholderText}>No Banner</Text>
                </View>
              )}
            </View>
            {/* Video Title */}
            <Text style={styles.title} numberOfLines={2} accessibilityRole="header">
              {video?.title || "Untitled"}
            </Text>
            {/* Category */}
            <Text style={styles.categoryBadge}>
              {video?.category || <Text style={{ color: Colors.grey }}>Unknown</Text>}
            </Text>
            {/* Description */}
            <Text style={styles.description}>{video?.description || "No description available."}</Text>

            {/* Placeholder for VideoPlayer */}
            <View style={styles.videoPlayerPlaceholder} accessibilityLabel="Video player area" testID="video-player-placeholder">
              <Text style={styles.videoPlayerText}>[Video Player will appear here]</Text>
            </View>
          </ScrollView>
        )}
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingTop: Platform.OS === "android" ? 0 : undefined,
  },
  scrollArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bannerWrap: {
    width: "100%",
    height: SCREEN_WIDTH * 0.54,
    backgroundColor: Colors.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  bannerPlaceholder: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ededed",
  },
  bannerPlaceholderText: {
    color: Colors.grey,
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    marginTop: 18,
    marginHorizontal: Sizing.padding,
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: 0.1,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    marginLeft: Sizing.padding,
    marginTop: 10,
    paddingVertical: 3,
    paddingHorizontal: 13,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    color: Colors.background,
    fontSize: 13,
    fontWeight: "700",
    overflow: "hidden",
    marginBottom: 10,
  },
  description: {
    marginHorizontal: Sizing.padding,
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
    fontWeight: "400",
    marginBottom: 28,
    marginTop: 4,
  },
  videoPlayerPlaceholder: {
    marginHorizontal: Sizing.padding,
    marginVertical: 20,
    minHeight: SCREEN_WIDTH * 0.45,
    backgroundColor: "#EDF2FA",
    borderRadius: 12,
    borderColor: Colors.border,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  videoPlayerText: {
    color: Colors.grey,
    fontSize: 15,
    fontStyle: "italic",
  },
  errorBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 46,
    backgroundColor: "#FAE2E5",
    margin: 32,
    borderRadius: 14,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.error,
    marginBottom: 14,
  },
  errorText: {
    fontSize: 15,
    color: "#910606",
    textAlign: "center",
  },
});
