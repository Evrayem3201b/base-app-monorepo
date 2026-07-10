import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "@/components/Themed";
import AdminDashboardLink from "@/components/auth/AdminDashboardLink";
import SignOutButton from "@/components/auth/SignOutButton";
import DeleteAccountButton from "@/components/auth/DeleteAccountButton";
import { useUserData } from "@/hooks/auth/useUserData";
import NavBar from "@/components/nav/NavBar";

export default function TabOneScreen() {
  const { user } = useUserData();

  return (
    <View style={styles.container}>
      
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.headerArea}>
          <Text style={styles.greeting}>
            Hello, {user?.name || "there"} 👋
          </Text>
          <Text style={styles.subtitle}>
            Manage your account settings and preferences below.
          </Text>
        </View>

        {/* Administration Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Administration</Text>
          <View style={styles.card}>
             {/* The card wraps your existing component nicely */}
            <AdminDashboardLink />
          </View>
        </View>

        {/* Account Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Security</Text>
          <View style={styles.card}>
            <View style={styles.actionRow}>
              <SignOutButton />
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.actionRow}>
              <DeleteAccountButton />
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  headerArea: {
    marginBottom: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.6,
    lineHeight: 22,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    opacity: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(150, 150, 150, 0.2)",
    overflow: "hidden",
  },
  actionRow: {
    padding: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(150, 150, 150, 0.2)",
    width: "100%",
  },
});