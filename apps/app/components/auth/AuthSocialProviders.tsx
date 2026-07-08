import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Pressable,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Text } from "@/components/Themed";
import { authClient } from "@/lib/auth/auth-client";

interface AuthSocialProvidersProps {
  colors: any
}

export default function AuthSocialProviders({ colors }: AuthSocialProvidersProps) {
  const [activeLoading, setActiveLoading] = useState<"google" | "facebook" | null>(null);

  const handleSocialSignIn = async (provider: "google" | "facebook") => {
    if (activeLoading) return;
    
    try {
      setActiveLoading(provider);
      
      await authClient.signIn.social({
        provider,
        // callbackURL: Platform.OS === "web" ? window.location.origin : "app://",
      });
    } catch (error) {
    //   console.error(`💥 Clerk-Social error on ${provider}:`, error);
    } finally {
      setActiveLoading(null);
    }
  };

  const isAnyLoading = activeLoading !== null;

  return (
    <View style={styles.container}>
      {/* Clerk Style Minimalist Divider */}
      <View style={styles.dividerContainer}>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, { color: colors.textSecondary ?? colors.text }]}>
          or continue with
        </Text>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
      </View>

      {/* Grid Layout Row */}
      <View style={styles.buttonGroupRow}>
        
        {/* Google Provider Button */}
        <Pressable
          disabled={isAnyLoading}
          onPress={() => handleSocialSignIn("google")}
          style={({ pressed }) => [
            styles.socialButton,
            {
              backgroundColor: pressed 
                ? (Platform.OS === "ios" ? "rgba(0,0,0,0.03)" : colors.border) 
                : colors.card,
              borderColor: colors.border,
              opacity: isAnyLoading && activeLoading !== "google" ? 0.5 : 1,
            },
          ]}
        >
          {activeLoading === "google" ? (
            <ActivityIndicator size="small" color={colors.text} />
          ) : (
            <>
              <Ionicons name="logo-google" size={18} color="#DB4437" />
              <Text style={[styles.buttonLabel, { color: colors.text }]}>Google</Text>
            </>
          )}
        </Pressable>

        {/* Facebook Provider Button */}
        <Pressable
          disabled={isAnyLoading}
          onPress={() => handleSocialSignIn("facebook")}
          style={({ pressed }) => [
            styles.socialButton,
            {
              backgroundColor: pressed 
                ? (Platform.OS === "ios" ? "rgba(0,0,0,0.03)" : colors.border) 
                : colors.card,
              borderColor: colors.border,
              opacity: isAnyLoading && activeLoading !== "facebook" ? 0.5 : 1,
            },
          ]}
        >
          {activeLoading === "facebook" ? (
            <ActivityIndicator size="small" color="#1877F2" />
          ) : (
            <>
              <Ionicons name="logo-facebook" size={18} color="#1877F2" />
              <Text style={[styles.buttonLabel, { color: colors.text }]}>Facebook</Text>
            </>
          )}
        </Pressable>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: -115,
    gap: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  divider: {
    flex: 1,
    height: 1,
    opacity: 0.4,
  },
  dividerText: {
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: -0.1,
    paddingHorizontal: 12,
  },
  buttonGroupRow: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 48, // Clerk components default to compact, highly professional heights
    borderRadius: 10, // Exact subtle rounded corner standard
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    // Native transitions properties
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 1,
      },
      android: {
        elevation: 0, // Clerk uses strict flat UI styling parameters
      },
    }),
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "500", // Clerk shifts away from heavy bold weights to premium medium weights
    letterSpacing: -0.1,
  },
});