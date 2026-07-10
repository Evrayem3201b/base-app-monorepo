import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSideMenu } from "@/contexts/SideMenuContext";
import useColorControl from "@/controllers/color.control";
import Button from "../ui/Button";

interface NavBarProps {
  title?: string;
  rightAction?: React.ReactNode; // Optional slot for a profile pic or settings icon
}

export default function NavBar({ title, rightAction }: NavBarProps) {
  const { toggle } = useSideMenu();
  const { colors } = useColorControl();
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: colors.background,
          paddingTop: insets.top, // Dynamic height for notch
          borderBottomColor: colors.inputBorder
        }
      ]}
    >
      {/* Left Slot: Menu */}
      <View style={styles.slot}>
        <Button 
          variant="icon" 
          icon="menu" 
          iconColor={colors.text} 
          onPress={toggle} 
          style={styles.menuButton}
        />
      </View>

      {/* Center Slot: Title */}
      <View style={styles.centerSlot}>
        {title && (
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>

      {/* Right Slot: Spacer or Action */}
      <View style={styles.slot}>
        {rightAction}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    height: 56 + 20, // Base height + extra for safe area, adjusted dynamically
    borderBottomWidth: Platform.select({ ios: 0.5, android: 1 }),
    // Subtle shadow for elegance
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 10,
  },
  slot: {
    width: 48, // Fixed width for buttons
    alignItems: "center",
    justifyContent: "center",
  },
  centerSlot: {
    flex: 1, // Takes up remaining space to push title to dead center
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.3, // Tighter tracking for a modern feel
  },
});