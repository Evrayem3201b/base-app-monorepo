import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Image } from "expo-image";
import { Text } from "@/components/Themed"; 
import { useUserData } from "@/hooks/auth/useUserData"; 
import { useUpdateUser } from "@/hooks/auth/useUpdateUser"; 
import useColorControl from "@/controllers/color.control";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function ProfileScreen() {
  const { colors } = useColorControl();
  const { user, isLoading: isUserLoading } = useUserData();
  const updateUser = useUpdateUser();

  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Keep state synced with server/cache updates
  useEffect(() => {
    if (user?.name) {
      setUsername(user.name);
    }
  }, [user]);

  const handleSave = () => {
    if (!username.trim() || username === user?.name || updateUser.isPending) {
      setIsEditing(false);
      return;
    }

    updateUser.mutate(
      { name: username },
      {
        onSuccess: () => {
          setIsEditing(false);
          setIsSuccess(true);
          const timer = setTimeout(() => setIsSuccess(false), 3000);
          return () => clearTimeout(timer);
        },
        onError: () => {
          setIsEditing(true); // Retain active edit mode if sync fails
        },
      }
    );
  };

  const handleCancel = () => {
    setUsername(user?.name || "");
    setIsEditing(false);
  };

  if (isUserLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        
        {/* --- Profile Image Header --- */}
        <View style={styles.heroSection}>
          <View style={styles.avatarWrapper}>
            {user?.image ? (
              <Image 
                source={{ uri: user.image }} 
                style={[styles.avatar, { borderColor: colors.card }]} 
                transition={300}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Ionicons name="person" size={48} color={colors.textSecondary} />
              </View>
            )}
            
            <View style={[styles.cameraBadge, { backgroundColor: colors.accent, borderColor: colors.background }]}>
              <Ionicons name="camera" size={14} color="#FFFFFF" />
            </View>
          </View>

          {/* --- Pure Inline Edit Interactions --- */}
          <View style={styles.nameContainer}>
            {isEditing ? (
              <View style={[styles.inputWrapper, { borderColor: colors.border, backgroundColor: colors.card }]}>
                <TextInput
                  style={[styles.inlineInput, { color: colors.text }]}
                  value={username}
                  onChangeText={setUsername}
                  autoFocus
                  maxLength={40}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleSave}
                  editable={!updateUser.isPending}
                />
                
                <View style={styles.inlineActions}>
                  {updateUser.isPending ? (
                    <ActivityIndicator size="small" color={colors.accent} style={styles.inlineSpinner} />
                  ) : (
                    <>
                      <Button
                        variant="icon"
                        icon="checkmark"
                        iconColor={colors.success}
                        onPress={handleSave}
                        size="sm"
                      />
                      <Button
                        variant="icon"
                        icon="close"
                        iconColor={colors.error}
                        onPress={handleCancel}
                        size="sm"
                      />
                    </>
                  )}
                </View>
              </View>
            ) : (
              <View style={styles.nameRow}>
                <Text style={[styles.displayName, { color: colors.text }]}>
                  {user?.name || "Set Name"}
                </Text>
                <Button
                  variant="icon"
                  icon="pencil"
                  iconColor={colors.textSecondary}
                  onPress={() => setIsEditing(true)}
                  size="sm"
                  style={styles.editButtonOffset}
                />
              </View>
            )}
          </View>

          <Text style={[styles.emailText, { color: colors.textSecondary }]}>
            {user?.email}
          </Text>
        </View>

        {/* --- Dynamic Status Badges --- */}
        <View style={styles.badgeContainer}>
          {isSuccess && (
            <Badge 
              variant="success" 
              label="Name saved perfectly" 
              icon="checkmark-circle" 
            />
          )}

          {updateUser.isError && (
            <Badge 
              variant="error" 
              label={updateUser.error.message || "Something went wrong"} 
              icon="alert-circle" 
            />
          )}
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 40,
    alignItems: "center",
  },
  
  // Header Structure
  heroSection: {
    alignItems: "center",
    width: "100%",
    maxWidth: 360,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 24,
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
  },
  avatarPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  cameraBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  // Name Editing Area Layout
  nameContainer: {
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 6,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 36, // Balance out the right edit icon offset to keep text truly centered
  },
  displayName: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  editButtonOffset: {
    marginLeft: 4,
    backgroundColor: "transparent",
  },
  emailText: {
    fontSize: 15,
    fontWeight: "400",
  },

  // Premium Custom Action Inputs
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 6,
  },
  inlineInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: -0.3,
    padding: 0,
  },
  inlineActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  inlineSpinner: {
    paddingHorizontal: 12,
  },

  // Bottom Messaging Track
  badgeContainer: {
    marginTop: 32,
    height: 40,
    justifyContent: "center",
  },
});