import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import type { Video } from "../data/videoTypes";
import Colors from "../theme/theme";

/**
 * PUBLIC_INTERFACE
 * VideoCard - Reusable card for showing a video's thumbnail, title, category,
 * and tapping to trigger navigation. Used in Home/Detail screens.
 *
 * Props:
 *   video: Video (required)
 *   onPress?: function called when card is pressed/tapped
 */
type Props = {
  video: Video;
  onPress?: () => void;
};
export default function VideoCard({ video, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.87}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open details for ${video.title}`}
      testID={`video-card-${video.id}`}
    >
      <Image
        source={{ uri: video.thumbnail }}
        style={styles.image}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.category}>{video.category}</Text>
        <Text numberOfLines={2} style={styles.title}>{video.title}</Text>
        <Text numberOfLines={2} style={styles.desc}>{video.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    flexDirection: "row",
    elevation: 3,
    shadowColor: "#222",
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    minHeight: 92,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: 96,
    height: 66,
    borderRadius: 8,
    marginRight: 14,
    backgroundColor: Colors.grey,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  category: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
  },
  title: {
    color: Colors.text,
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 3,
    flexShrink: 1,
  },
  desc: {
    fontSize: 13,
    color: Colors.grey,
    fontStyle: "italic"
  },
});
