import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
  Pressable,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import { useSideMenu } from "@/contexts/SideMenuContext";
import { authClient } from "@/lib/auth/auth-client";
import useColorControl from "@/controllers/color.control";

const MENU_WIDTH = Math.min(300, Dimensions.get("window").width * 0.8);

interface MenuItem {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
  destructive?: boolean;
}

export default function SideMenu() {
  const { isOpen, close } = useSideMenu();
  const { colors } = useColorControl();
  const { data: session } = authClient.useSession();
  const isAdmin = session && (session.user as any).role === "admin";

  const translateX = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: isOpen ? 0 : -MENU_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: isOpen ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  function go(path: string) {
    close();
    router.push(path as any);
  }

  async function handleSignOut() {
    close();
    await authClient.signOut();
  }

  const items: MenuItem[] = [
    { label: "Home", icon: "home-outline", onPress: () => go("/(tabs)") },
    { label: "Profile", icon: "person-outline", onPress: () => go("/(settings)/Profile") },
    ...(isAdmin
      ? [{ label: "Admin Dashboard", icon: "shield-checkmark-outline" as const, onPress: () => go("/(admin)") }]
      : []),
    { label: "Sign Out", icon: "log-out-outline", onPress: handleSignOut, destructive: true },
  ];

  return (
    <>
      {/* Backdrop — only intercepts touches while open */}
      <Animated.View
        pointerEvents={isOpen ? "auto" : "none"}
        style={[styles.overlay, { opacity: overlayOpacity }]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={close} />
      </Animated.View>

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            backgroundColor: colors.background,
            transform: [{ translateX }],
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={[styles.userName, { color: colors.text }]}>
            {session?.user?.name ?? "Guest"}
          </Text>
          <Text style={[styles.userEmail, { color: colors.secondaryText }]}>
            {session?.user?.email ?? ""}
          </Text>
        </View>

        <View style={styles.items}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.item}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color={item.destructive ? "#FF3B30" : colors.text}
              />
              <Text
                style={[
                  styles.itemLabel,
                  { color: item.destructive ? "#FF3B30" : colors.text },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 10,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: MENU_WIDTH,
    zIndex: 11,
    paddingTop: 60,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  header: {
    marginBottom: 28,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#8888",
  },
  userName: { fontSize: 18, fontWeight: "700" },
  userEmail: { fontSize: 13, marginTop: 2 },
  items: { gap: 4 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  itemLabel: { fontSize: 16, fontWeight: "500" },
});