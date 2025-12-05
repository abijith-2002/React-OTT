import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Colors from "../theme/theme";
import type { Category } from "../data/videoTypes";

interface CategoryTabsProps {
  categories: Category[];
  selected: Category;
  onSelect: (cat: Category) => void;
}

/**
 * PUBLIC_INTERFACE
 * CategoryTabs - Tab selector for video categories.
 * Shows tabs horizontally with selected tab highlighted.
 */
export default function CategoryTabs({ categories, selected, onSelect }: CategoryTabsProps) {
  return (
    <View style={styles.container} accessibilityRole="tablist">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.tab,
              selected === cat && styles.selectedTab,
            ]}
            onPress={() => onSelect(cat)}
            accessibilityRole="tab"
            accessibilityState={{ selected: selected === cat }}
            testID={`tab-${cat}`}
          >
            <Text style={[
              styles.tabText,
              selected === cat && styles.selectedText
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginHorizontal: 6,
    backgroundColor: "#F3F7FA",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    color: Colors.text,
    fontWeight: "500",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  selectedText: {
    color: Colors.background,
    fontWeight: "bold",
  },
});
