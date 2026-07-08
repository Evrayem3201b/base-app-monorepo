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
  colors: any;
}

export default function AuthSocialProviders({ colors }: AuthSocialProvidersProps) {
  const [activeLoading, setActiveLoading] = useState<"google" | "facebook" | null>(null);

  const handleSocialSignIn = async (provider: "google" | "facebook") => {
    if (activeLoading) return;
    
    try {
      setActiveLoading(provider);
      await authClient.signIn.social({ provider });
    } catch (error) {
      // Error handling
    } finally {
      setActiveLoading(null);
    }
  };

  const isAnyLoading = activeLoading !== null;
  const secondaryTextColor = colors.textSecondary ?? colors.text;

  return (
    <View style={styles.container}>
      {/* Premium Minimalist Divider */}
      <View style={styles.dividerContainer}>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, { color: secondaryTextColor }]}>
          or continue with
        </Text>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
      </View>

      {/* Button Layout */}
      <View style={styles.buttonGroupRow}>
        <Pressable
          disabled={isAnyLoading}
          onPress={() => handleSocialSignIn("google")}
          style={({ pressed }) => [
            styles.socialButton,
            {
              backgroundColor: pressed 
                ? (Platform.OS === "ios" ? "rgba(0, 0, 0, 0.02)" : colors.border) 
                : colors.card,
              borderColor: colors.border,
              opacity: isAnyLoading ? 0.7 : 1,
            },
          ]}
        >
          {activeLoading === "google" ? (
            <ActivityIndicator size="small" color={colors.text} />
          ) : (
            <View style={styles.buttonContent}>
              <Ionicons name="logo-google" size={17} color="#DB4437" />
              <Text style={[styles.buttonLabel, { color: colors.text }]}>Google</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // Using a tight structural gap to keep it visually anchored to whatever is above it
    gap: 16, 
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  divider: {
    flex: 1,
    height: 1,
    opacity: 0.4,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: -0.1,
    paddingHorizontal: 12,
    textTransform: "lowercase",
    opacity: 0.6,
  },
  buttonGroupRow: {
    flexDirection: "row",
    width: "100%",
  },
  socialButton: {
    flex: 1,
    height: 48, 
    borderRadius: 12, 
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 2,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "600", 
    letterSpacing: -0.2,
  },
});