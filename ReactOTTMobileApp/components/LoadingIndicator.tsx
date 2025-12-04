import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Colors from "../theme/theme";

/**
 * PUBLIC_INTERFACE
 * LoadingIndicator - Simple, centered loading spinner.
 * Use for async loading states (e.g., while fetching video data).
 */
export default function LoadingIndicator() {
  return (
    <View style={styles.container} accessibilityLabel="loading">
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
