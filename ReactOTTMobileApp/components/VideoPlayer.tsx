import React, { useRef, useState } from "react";
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  Dimensions 
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../theme/theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type VideoPlayerProps = {
  /** The video source URL to play (MP4, HLS, etc) */
  sourceUrl?: string | null;
  /** Optional image shown before video loads */
  poster?: string;
  /** Optional: set testID for unit tests */
  testID?: string;
};

/**
 * PUBLIC_INTERFACE
 * VideoPlayer - Expo AV-based video player with controls.
 * Provides play/pause, seek, fullscreen in Expo managed workflow (Android, iOS).
 * Handles loading, error, fallback gracefully if source is missing/invalid.
 * Usage: <VideoPlayer sourceUrl={videoUrl} poster={bannerImgUrl} />
 */
export default function VideoPlayer({ sourceUrl, poster, testID }: VideoPlayerProps) {
  const playerRef = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [playError, setPlayError] = useState<string | null>(null);

  // Source guard
  const isUrlValid =
    typeof sourceUrl === "string" &&
    (sourceUrl.startsWith("http") ||
      sourceUrl.startsWith("https") ||
      sourceUrl.startsWith("rtmp") ||
      sourceUrl.startsWith("rtsp"));

  // Error or no URL: fallback UI
  if (!isUrlValid) {
    return (
      <View style={styles.fallback} testID={testID || "video-fallback"}>
        <MaterialIcons name="videocam-off" size={48} color={Colors.grey} />
        <Text style={styles.fallbackText}>
          {sourceUrl
            ? "Cannot play this video (invalid URL)."
            : "No video available."}
        </Text>
      </View>
    );
  }

  // -- Handler for status updates
  const handlePlaybackStatusUpdate = (s: AVPlaybackStatus) => {
    setStatus(s);
    setLoading(s.isBuffering || !s.isLoaded);
    if (!s.isLoaded && s.error) setPlayError(s.error);
    else setPlayError(null);
  };

  // -- Play/pause toggle
  const togglePlayPause = async () => {
    if (!status || !playerRef.current || !status.isLoaded) return;
    if (status.isPlaying) {
      await playerRef.current.pauseAsync();
    } else {
      await playerRef.current.playAsync();
    }
  };

  // -- Seek handling
  const seek = async (delta: number) => {
    if (playerRef.current && status && status.isLoaded && typeof status.positionMillis === "number") {
      const next = Math.max(0, status.positionMillis + delta);
      await playerRef.current.setPositionAsync(next);
    }
  };

  // -- Fullscreen toggle
  const handleFullscreen = async () => {
    if (playerRef.current) {
      try {
        await playerRef.current.presentFullscreenPlayer();
        setIsFullscreen(true);
      } catch {
        // Ignore if not supported
      }
    }
  };

  // Rendering control bar
  const renderControls = () => {
    if (!status?.isLoaded) return null;
    return (
      <View style={styles.controls} pointerEvents="box-none">
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => seek(-10000)} accessibilityLabel="Rewind 10 seconds">
          <MaterialIcons name="replay_10" size={32} color={Colors.background} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={togglePlayPause} accessibilityLabel={status.isPlaying ? "Pause" : "Play"}>
          <MaterialIcons
            name={status.isPlaying ? "pause-circle-filled" : "play-circle-filled"}
            size={44}
            color={Colors.background}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={() => seek(10000)} accessibilityLabel="Forward 10 seconds">
          <MaterialIcons name="forward-10" size={32} color={Colors.background} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctrlBtn} onPress={handleFullscreen} accessibilityLabel="Fullscreen">
          <MaterialIcons name="fullscreen" size={32} color={Colors.background} />
        </TouchableOpacity>
      </View>
    );
  };

  // Loading or error overlays
  if (playError) {
    return (
      <View style={styles.fallback} testID="video-error">
        <MaterialIcons name="error-outline" size={40} color={Colors.error} />
        <Text style={styles.fallbackText}>{playError}</Text>
      </View>
    );
  }

  // Video area
  return (
    <View style={styles.playerWrap} testID={testID || "video-player"}>
      <Video
        ref={playerRef}
        source={{ uri: sourceUrl! }}
        style={styles.video}
        posterSource={poster ? { uri: poster } : undefined}
        posterStyle={styles.poster}
        usePoster={!!poster}
        resizeMode="contain"
        shouldPlay={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        useNativeControls={false} // Custom controls below
        isLooping={false}
        progressUpdateIntervalMillis={500}
      />
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color={Colors.primary} size="large" />
        </View>
      )}
      {!loading && renderControls()}
    </View>
  );
}

const VP_HEIGHT = SCREEN_WIDTH * 0.55;

const styles = StyleSheet.create({
  playerWrap: {
    width: "100%",
    aspectRatio: 16 / 9,
    minHeight: VP_HEIGHT,
    backgroundColor: "#242c38",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    borderRadius: 12,
  },
  controls: {
    flexDirection: "row",
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0009",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 4,
    gap: 10,
  },
  ctrlBtn: {
    marginHorizontal: 10,
    padding: 2
  },
  fallback: {
    width: "100%",
    minHeight: VP_HEIGHT,
    backgroundColor: "#EDF2FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    padding: 18
  },
  fallbackText: {
    color: Colors.grey,
    fontSize: 15,
    textAlign: "center",
    marginTop: 12,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0005",
    borderRadius: 12,
  },
  poster: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  }
});
