import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import AuthInput from "./AuthInput";
import { useChangePasswordForm } from "@/hooks/auth/useChangePasswordForm";
import useColorControl from "@/controllers/color.control";

export default function ChangePasswordForm() {
  const { colors, isDarkMode } = useColorControl();
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    focusedField,
    setFocusedField,
    isLoading,
    formError,
    success,
    submit,
  } = useChangePasswordForm();

  return (
    <View style={styles.container}>
      <AuthInput
        label="Current Password"
        placeholder="••••••••"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        isFocused={focusedField === "current"}
        onFocus={() => setFocusedField("current")}
        onBlur={() => setFocusedField(null)}
        autoCapitalize="none"
        autoCorrect={false}
        colors={colors}
        isDarkMode={isDarkMode}
      />

      <AuthInput
        label="New Password"
        placeholder="••••••••"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        isFocused={focusedField === "new"}
        onFocus={() => setFocusedField("new")}
        onBlur={() => setFocusedField(null)}
        autoCapitalize="none"
        autoCorrect={false}
        colors={colors}
        isDarkMode={isDarkMode}
      />

      {formError && <Text style={styles.error}>{formError}</Text>}
      {success && <Text style={styles.success}>Password changed successfully.</Text>}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.buttonBg, opacity: isLoading ? 0.6 : 1 }]}
        onPress={submit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.buttonText} />
        ) : (
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>Change Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  error: { color: "#FF3B30", fontSize: 13, textAlign: "center" },
  success: { color: "#34C759", fontSize: 13, textAlign: "center" },
  button: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "600" },
});