import React from "react";
import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { View, Text } from "@/components/Themed";
import useColorControl from "@/controllers/color.control";

export type BadgeVariant = "success" | "error" | "info" | "neutral";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export default function Badge({
  label,
  variant = "neutral",
  icon,
  style,
  labelStyle,
}: BadgeProps) {
  const { colors } = useColorControl();

  // Dynamically resolve theme colors based on variant selection
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          bg: colors.successBg || "rgba(46, 204, 113, 0.15)",
          text: colors.success || "#2ecc71",
        };
      case "error":
        return {
          bg: colors.errorBg || "rgba(231, 76, 60, 0.15)",
          text: colors.error || "#e74c3c",
        };
      case "info":
        return {
          bg: colors.inputBg || "rgba(52, 152, 219, 0.15)",
          text: colors.accent || "#3498db",
        };
      case "neutral":
      default:
        return {
          bg: colors.card,
          text: colors.textSecondary,
        };
    }
  };

  const currentTheme = getVariantStyles();

  return (
    <View style={[styles.badge, { backgroundColor: currentTheme.bg }, style]}>
      {icon && (
        <Ionicons
          name={icon}
          size={15}
          color={currentTheme.text}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color: currentTheme.text }, labelStyle]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: -0.1,
  },
});