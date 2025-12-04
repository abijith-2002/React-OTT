import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// PUBLIC_INTERFACE
export default function VideoCard() {
  /** Reusable VideoCard component for displaying video thumbnail and info */
  return (
    <View style={styles.card}>
      <Text>Video Card Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    padding: 16,
    elevation: 2
  }
});
