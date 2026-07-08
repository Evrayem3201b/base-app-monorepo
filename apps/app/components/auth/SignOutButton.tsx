import React from "react";
import { TouchableOpacity, Text, Alert, StyleSheet, Pressable } from "react-native";
import { authClient } from "@/lib/auth/auth-client";

export default function SignOutButton() {
  async function handleSignOut() {
    try {
      await authClient.signOut();
    } catch (err) {
      console.error("Sign out failed:", err);
      Alert.alert("Error", "Could not sign out. Try again.");
    }
  }

  return (
    <Pressable style={styles.button} onPress={handleSignOut}>
      <Text>Sign Out</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#e5e5e5",
  },
});