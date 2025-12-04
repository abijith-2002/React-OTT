import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// PUBLIC_INTERFACE
export default function HomeScreen() {
  /** Home screen for displaying video categories and lists */
  return (
    <View style={styles.container}>
      <Text>Home Screen Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
