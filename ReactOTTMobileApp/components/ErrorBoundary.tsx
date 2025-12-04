import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * PUBLIC_INTERFACE
 * ErrorBoundary - Catches JS errors in child component tree.
 * Fallback: Show error message.
 */
interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}
export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }
  componentDidCatch(error: Error) {
    // Update state so next render shows fallback UI
    this.setState({ hasError: true, error });
    // Optionally log to external
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.fallback}>
          <Text style={styles.title}>Something went wrong.</Text>
          <Text style={styles.description}>
            {this.state.error?.message || "Unknown error occurred."}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    backgroundColor: "#fff3f4",
  },
  title: {
    color: "#C00",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    color: "#910606",
    fontSize: 15,
    textAlign: "center"
  },
});
