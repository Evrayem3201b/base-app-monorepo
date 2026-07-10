import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";

export type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  label?: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
  leftIcon?: React.ComponentProps<typeof Ionicons>["name"];
  rightIcon?: React.ComponentProps<typeof Ionicons>["name"];
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export default function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  icon,
  iconColor,
  leftIcon,
  rightIcon,
  style,
  labelStyle,
}: ButtonProps) {
  const getContainerStyle = (pressed: boolean) => {
    let baseStyle: ViewStyle = { ...styles.baseContainer };

    // Apply Size (Differentiate shapes for icon vs text buttons)
    if (variant === "icon") {
      if (size === "sm") baseStyle = { ...baseStyle, ...styles.iconSizeSm };
      if (size === "md") baseStyle = { ...baseStyle, ...styles.iconSizeMd };
      if (size === "lg") baseStyle = { ...baseStyle, ...styles.iconSizeLg };
    } else {
      if (size === "sm") baseStyle = { ...baseStyle, ...styles.sizeSm };
      if (size === "md") baseStyle = { ...baseStyle, ...styles.sizeMd };
      if (size === "lg") baseStyle = { ...baseStyle, ...styles.sizeLg };
    }

    // Apply Variant Colors
    switch (variant) {
      case "primary":
        baseStyle = { ...baseStyle, backgroundColor: "#4f46e5" };
        break;
      case "secondary":
        baseStyle = { ...baseStyle, backgroundColor: "#e5e7eb" };
        break;
      case "outline":
        baseStyle = {
          ...baseStyle,
          backgroundColor: "transparent",
          borderWidth: 1.5,
          borderColor: "#d1d5db",
        };
        break;
      case "danger":
        baseStyle = { ...baseStyle, backgroundColor: "#ef4444" };
        break;
      case "ghost":
      case "icon":
        baseStyle = { ...baseStyle, backgroundColor: "transparent" };
        break;
    }

    // Apply Interactive States
    if (disabled || isLoading) {
      baseStyle.opacity = 0.6;
    } else if (pressed) {
      baseStyle.opacity = (variant === "ghost" || variant === "outline" || variant === "icon") ? 0.6 : 0.8;
      baseStyle.transform = [{ scale: 0.98 }];
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    let baseText: TextStyle = { ...styles.baseText };

    if (size === "sm") baseText.fontSize = 14;
    if (size === "md") baseText.fontSize = 16;
    if (size === "lg") baseText.fontSize = 18;

    switch (variant) {
      case "primary":
      case "danger":
        baseText.color = "#ffffff";
        break;
      case "secondary":
        baseText.color = "#1f2937";
        break;
      case "outline":
      case "ghost":
      case "icon":
        baseText.color = iconColor ?? "#4b5563";
        break;
    }

    return baseText;
  };

  // Dynamically size icons based on the button size prop
  const iconSize = size === "sm" ? 18 : size === "md" ? 22 : 26;
  const resolvedIconColor = iconColor || getTextStyle().color;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      style={({ pressed }) => [getContainerStyle(pressed), style]}
    >
      {isLoading ? (
        <ActivityIndicator 
          color={variant === "primary" || variant === "danger" ? "#fff" : (iconColor || "#4f46e5")} 
        />
      ) : (
        <>
          {leftIcon && <Ionicons name={leftIcon} size={iconSize} color={resolvedIconColor} />}
          {icon && <Ionicons name={icon} size={iconSize} color={resolvedIconColor} />}
          {label && <Text style={[getTextStyle(), labelStyle]}>{label}</Text>}
          {rightIcon && <Ionicons name={rightIcon} size={iconSize} color={resolvedIconColor} />}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    gap: 8,
  },
  baseText: {
    fontWeight: "600",
    letterSpacing: -0.3,
  },
  
  // Standard Button Sizing
  sizeSm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sizeMd: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    minHeight: 48,
  },
  sizeLg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 56,
  },

  // Icon Button Sizing (Fixed aspect ratio)
  iconSizeSm: {
    width: 36,
    height: 36,
    padding: 0,
  },
  iconSizeMd: {
    width: 48,
    height: 48,
    padding: 0,
  },
  iconSizeLg: {
    width: 56,
    height: 56,
    padding: 0,
  },
});