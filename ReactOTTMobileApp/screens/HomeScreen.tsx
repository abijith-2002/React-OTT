import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  RefreshControl,
  SafeAreaView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CategoryTabs from "../components/CategoryTabs";
import VideoCard from "../components/VideoCard";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorBoundary from "../components/ErrorBoundary";
import Colors, { Sizing } from "../theme/theme";
import type { Video, Category } from "../data/videoTypes";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { useVideos } from "../App";

// Helper: Categories must match the enum type and tabs
const CATEGORY_LIST: Category[] = ["Movies", "Sports", "News"];

// PUBLIC_INTERFACE
/**
 * HomeScreen displays category tabs and the video's list for selected category.
 * Shows loading, empty, or error states. Navigates to the Detail screen on card press.
 */
export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();

  // UI state
  const [selectedCat, setSelectedCat] = useState<Category>("Movies");
  const [refreshing, setRefreshing] = useState(false);

  // Load/validate videos once from global VideosContext
  const { videosByCategory, errors } = useVideos();
  const videos = videosByCategory[selectedCat];
  // Note: data state logic previously present was unused and caused linter violations. Rely on local logic instead.

  // Pull-to-refresh (simulated - will just reload from in-memory mock for now)
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 650); // simulate light refresh delay
  }, []);

  // Navigate to detail page with video id param
  const handleCardPress = (video: Video) => {
    navigation.navigate("Detail", { videoId: video.id });
  };

  // Empty state UI
  const EmptyContent = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyTitle}>No videos found.</Text>
      <Text style={styles.emptyText}>
        We couldn&apos;t find any videos in this category.
      </Text>
    </View>
  );

  // Error UI
  const ErrorContent = () => (
    <View style={styles.errorStateContainer} testID="error-state">
      <Text style={styles.errorTitle}>Oops! Data Error</Text>
      <Text style={styles.errorText}>
        {errors?.join("\n") || "Something went wrong loading video data."}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <ErrorBoundary>
        <View style={styles.top}>
          <CategoryTabs
            categories={CATEGORY_LIST}
            selected={selectedCat}
            onSelect={setSelectedCat}
          />
        </View>
        {/* List/Loading/Error/Empty */}
        <View style={styles.listWrap}>
          {errors.length > 0 ? (
            <ErrorContent />
          ) : !videos || refreshing ? (
            <LoadingIndicator />
          ) : videos.length === 0 ? (
            <EmptyContent />
          ) : (
            <FlatList
              data={videos}
              renderItem={({ item }) => (
                <VideoCard video={item} onPress={() => handleCardPress(item)} />
              )}
              keyExtractor={(item: Video) => item.id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                  tintColor={Colors.primary}
                  colors={[Colors.primary]}
                />
              }
              ListFooterComponent={<View style={{ height: 28 }} />}
              initialNumToRender={6}
              accessibilityLabel={`${selectedCat} videos list`}
              testID="video-list"
            />
          )}
        </View>
      </ErrorBoundary>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingTop: Platform.OS === "android" ? 0 : undefined,
  },
  top: {
    backgroundColor: Colors.background,
    paddingTop: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  listWrap: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingBottom: 0,
  },
  listContent: {
    paddingVertical: Sizing.padding,
    minHeight: 200,
  },
  emptyStateContainer: {
    alignItems: "center",
    padding: 48,
    marginTop: 36,
    backgroundColor: "#F7F8FA66",
    borderRadius: 10,
    marginHorizontal: 28,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.primary,
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.grey,
    textAlign: "center",
  },
  errorStateContainer: {
    alignItems: "center",
    padding: 48,
    marginTop: 38,
    backgroundColor: "#FAE2E5",
    borderRadius: 10,
    marginHorizontal: 24,
  },
  errorTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: Colors.error,
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  errorText: {
    fontSize: 15,
    color: "#910606",
    textAlign: "center",
  },
});
