import React, { useMemo } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useVideos } from "../App";
import type { Video } from "../data/videoTypes";
import Colors, { Sizing } from "../theme/theme";
import ErrorBoundary from "../components/ErrorBoundary";
import LoadingIndicator from "../components/LoadingIndicator";
import VideoPlayer from "../components/VideoPlayer";

// Helper: video lookup by id
function getVideoById(id: string | undefined, all: Video[]): Video | undefined {
  if (!id) return undefined;
  return all.find(v => v.id === id);
}

// PUBLIC_INTERFACE
/**
 * PlayerScreen - Dedicated screen for video playback.
 * Accepts: route params { videoId: string }
 * Fetches the selected video from context and renders VideoPlayer with controls and fullscreen support.
 * Handles missing video or data errors with a simple fallback message.
 */
export default function PlayerScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Player">>();

  const videoId = route.params?.videoId;
  const { allVideos, errors: dataErrors } = useVideos();

  const { video, errorMsg } = useMemo(() => {
    if (!videoId || typeof videoId !== "string") {
      return { video: undefined, errorMsg: "Video ID missing in navigation parameters." };
    }
    if (dataErrors.length > 0 || !allVideos || allVideos.length === 0) {
      return { video: undefined, errorMsg: "Error loading video data. Please try again later." };
    }
    const v = getVideoById(videoId, allVideos);
    if (!v) return { video: undefined, errorMsg: "Could not find video with the requested ID." };
    return { video: v, errorMsg: undefined };
  }, [videoId, allVideos, dataErrors]);

  // Update header title if we have video
  React.useEffect(() => {
    if (video?.title) {
      navigation.setOptions({ title: video.title });
    } else {
      navigation.setOptions({ title: "Player" });
    }
  }, [navigation, video?.title]);

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
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.playerWrap}>
              <VideoPlayer
                sourceUrl={video?.videoUrl}
                poster={video?.banner || video?.thumbnail}
                testID="player-video"
              />
            </View>
            <Text style={styles.metaTitle} numberOfLines={2} accessibilityRole="header">
              {video?.title}
            </Text>
            <Text style={styles.metaCategory}>{video?.category}</Text>
            <Text style={styles.metaDescription}>{video?.description}</Text>
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
  content: {
    paddingBottom: 28,
    backgroundColor: Colors.background,
  },
  playerWrap: {
    marginHorizontal: Sizing.padding,
    marginTop: 18,
  },
  metaTitle: {
    marginTop: 18,
    marginHorizontal: Sizing.padding,
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    letterSpacing: 0.1,
  },
  metaCategory: {
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
  metaDescription: {
    marginHorizontal: Sizing.padding,
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
    fontWeight: "400",
    marginBottom: 28,
    marginTop: 4,
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
