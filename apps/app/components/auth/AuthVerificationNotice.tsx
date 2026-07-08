import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

interface Props {
  email: string;
  colors: any;
  onResend: () => void;
  onBack: () => void;
  resendCooldown: boolean;
}

export default function AuthVerificationNotice({ email, colors, onResend, onBack, resendCooldown }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Check your email</Text>
      <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
        We sent a verification link to{"\n"}
        <Text style={{ fontWeight: "600" }}>{email}</Text>. Tap it to activate your account.
      </Text>

      <TouchableOpacity
        style={[styles.resendButton, { backgroundColor: colors.buttonBg, opacity: resendCooldown ? 0.5 : 1 }]}
        onPress={onResend}
        disabled={resendCooldown}
        activeOpacity={0.85}
      >
        {resendCooldown ? (
          <ActivityIndicator color={colors.buttonText} />
        ) : (
          <Text style={[styles.resendButtonText, { color: colors.buttonText }]}>Resend email</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
        <Text style={[styles.backText, { color: colors.secondaryText }]}>Back to sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 24, gap: 16 },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 15, lineHeight: 22, textAlign: "center" },
  resendButton: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  resendButtonText: { fontSize: 16, fontWeight: "600" },
  backButton: { alignItems: "center", paddingVertical: 8 },
  backText: { fontSize: 14 },
});