import React from "react";
import { TouchableOpacity, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { authClient } from "@/lib/auth/auth-client";
import Button from "../ui/Button";

export default function AdminDashboardLink() {
  const { data: session } = authClient.useSession();
  const isAdmin = session && (session.user as any).role === "admin";

  if (!isAdmin) return null;

  return (
    <Button label="Go to Admin Dashboard" variant="primary" onPress={() => router.push("/(admin)")} />
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