// components/nav/ThemeSwitcher.tsx
import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, Pressable } from "react-native";
import Button from "@/components/ui/Button";
import useColorControl from "@/controllers/color.control";


const ORDER = ["light", "dark", "system"] as const;

const ICON_MAP = {
  light: "sunny-outline",
  dark: "moon-outline",
} as const;

export default function ThemeSwitcher({ style }: { style?: StyleProp<ViewStyle> }) {
 
  const { colors, toggleTheme, isDark } = useColorControl();

  

  return (
    <Button
        onPress={toggleTheme}
        variant="icon"
        icon={isDark ? "sunny" : "moon"}
          size="md"
          iconColor={isDark ? "#FFD60A" : colors.text}
        style={[
          
          { borderColor: colors.border },
        ]}
      />
        
     
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: 12 },
});