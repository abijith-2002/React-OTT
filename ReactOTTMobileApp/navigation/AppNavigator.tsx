import React from "react";
import { NavigationContainer, DefaultTheme, Theme } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import PlayerScreen from "../screens/PlayerScreen";
import { AppConfig } from "../utils/config";

// PUBLIC_INTERFACE
/**
 * AppNavigator provides the core navigation stack (Home, Detail, Player) for the OTT app.
 * Use this as the main navigator within the application root.
 */
export type RootStackParamList = {
  Home: undefined;
  Detail: { videoId: string } | undefined;
  Player: { videoId: string; title?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#1244A1",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

/**
 * Exports the root AppNavigator for stack-based navigation.
 * Includes:
 *   - Home: Category and video list
 *   - Detail: Video detail UI
 *   - Player: Dedicated video playback screen
 */
export default function AppNavigator() {
  // Read config booleans safely; currently used as a no-op placeholder to ensure
  // boolean parsing never throws if env values are provided as strings.
  // In future, this can control theme or navigation behavior.
  // Evaluate to ensure config parsing is exercised; not currently used to alter navigation
  void AppConfig.useEdgeToEdge();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "#FFFFFF",
        },
      } as Theme}
    >
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Browse" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{ title: "Player" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
