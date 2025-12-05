import React, { createContext, useContext, useMemo } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import ErrorBoundary from "./components/ErrorBoundary";
import { loadVideos } from "./utils/dataLoader";

// --- VideosContext: Exposes video data & possible errors globally ---
import type { VideoList, VideoMap } from "./data/videoTypes";

/**
 * PUBLIC_INTERFACE
 * VideosContext provides access to mock video data and associated load errors.
 * Wrap the app in VideosProvider and consume via useVideos() hook.
 */
type VideosContextProps = {
  videosByCategory: VideoMap;
  allVideos: VideoList;
  errors: string[];
};
const VideosContext = createContext<VideosContextProps | undefined>(undefined);

export function useVideos() {
  const ctx = useContext(VideosContext);
  if (!ctx) throw new Error("useVideos must be used within a VideosProvider");
  return ctx;
}

const VideosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load and memoize mock video data at app startup
  const { videosByCategory, allVideos, errors } = useMemo(() => loadVideos(), []);
  const videoValue = useMemo(
    () => ({ videosByCategory, allVideos, errors }),
    [videosByCategory, allVideos, errors]
  );
  return <VideosContext.Provider value={videoValue}>{children}</VideosContext.Provider>;
};

/**
 * PUBLIC_INTERFACE
 * App.tsx wraps the app with:
 *   - SafeAreaProvider for proper safe-area support.
 *   - ErrorBoundary to catch top-level app errors.
 *   - VideosProvider to expose video data.
 *   - AppNavigator for navigation & theme.
 *   - StatusBar via AppNavigator/screens.
 */
export default function App() {
  // Early config resolution to ensure no runtime cast issues from env
  try {
    // Lazy import to avoid cycle at module top; small overhead acceptable.
    const { AppConfig } = require("./utils/config");
    // Touch the booleans and JSON parsing; this should never throw.
    // eslint-disable-next-line no-console
    console.debug?.("[App] Config resolved", {
      trustProxy: AppConfig.trustProxy(),
      experimentsEnabled: AppConfig.experimentsEnabled(),
      logLevel: AppConfig.logLevel(),
      healthcheckPath: AppConfig.healthcheckPath(),
      edgeToEdge: AppConfig.useEdgeToEdge(),
      featureFlags: AppConfig.featureFlags(),
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn?.("[App] Config resolution error (handled):", (e as Error)?.message);
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <VideosProvider>
          <AppNavigator />
        </VideosProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
