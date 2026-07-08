import React from "react";
import { Text, TouchableOpacity, View, ActivityIndicator, StyleSheet } from "react-native";

interface AuthFooterProps {
  isSignUp: boolean;
  isLoading: boolean;
  colors: any;
  onSubmit: () => void;
  onSwitch: () => void;
}

export default function AuthFooter({ isSignUp, isLoading, colors, onSubmit, onSwitch }: AuthFooterProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: colors.buttonBg }]}
        onPress={onSubmit}
        activeOpacity={0.85}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.buttonText} />
        ) : (
          <Text style={[styles.primaryButtonText, { color: colors.buttonText }]}>
            {isSignUp ? "Sign Up" : "Continue"}
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.switchButton} onPress={onSwitch} activeOpacity={0.7}>
        <Text style={[styles.switchButtonText, { color: colors.secondaryText }]}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Text style={{ color: colors.accent, fontWeight: "600" }}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16, width: "100%" },
  primaryButton: {
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  primaryButtonText: { fontSize: 17, fontWeight: "600", letterSpacing: -0.4 },
  switchButton: { alignItems: "center", paddingVertical: 8 },
  switchButtonText: { fontSize: 14, letterSpacing: -0.1 },
});