import React from "react";
import { NavigationContainer, DefaultTheme, Theme } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

// PUBLIC_INTERFACE
/**
 * AppNavigator provides the core navigation stack (Home, Detail) for the OTT app.
 * Use this as the main navigator within the application root.
 */
export type RootStackParamList = {
  Home: undefined;
  Detail: { videoId: string } | undefined;
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
 */
export default function AppNavigator() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
