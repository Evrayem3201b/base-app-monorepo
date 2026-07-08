import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function AuthHeader({ isSignUp, colors }: { isSignUp: boolean; colors: any }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        {isSignUp ? "Create Account" : "Sign In"}
      </Text>
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
        {isSignUp
          ? "Sign up to get started with your new account."
          : "Welcome back. Enter your credentials to access your account."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  title: { fontSize: 34, fontWeight: "700", letterSpacing: -1, marginBottom: 8 },
  subtitle: { fontSize: 16, lineHeight: 22, letterSpacing: -0.2 },
});