import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// PUBLIC_INTERFACE
export default function DetailScreen() {
  /** Detail screen for showing video details */
  return (
    <View style={styles.container}>
      <Text>Detail Screen Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
