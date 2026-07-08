import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useColorControl from "@/controllers/color.control";
import { useAuthForm } from "@/hooks/useAuthForm";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthFooter from "./AuthFooter";
import AuthVerificationNotice from "./AuthVerificationNotice";
import AuthSocialProviders from "./AuthSocialProviders";
import { authClient } from "@/lib/auth/auth-client";

interface AuthFormProps {
  onForgotPassword?: () => void;
}

export default function AuthForm({ onForgotPassword }: AuthFormProps) {
  const { colors, isDarkMode } = useColorControl();
  const {
    isSignUp,
    setIsSignUp,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    focusedField,
    setFocusedField,
    isLoading,
    formError,
    submit,
    verificationPending,
    setVerificationPending,
    resendVerification,
    resendCooldown,
  } = useAuthForm();

  if (verificationPending) {
    return (
      <AuthVerificationNotice
        email={email}
        colors={colors}
        onResend={resendVerification}
        onBack={() => setVerificationPending(false)}
        resendCooldown={resendCooldown}
      />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <AuthHeader isSignUp={isSignUp} colors={colors} />

          <View style={styles.formContainer}>
            {isSignUp && (
              <AuthInput
                label="Name"
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
                isFocused={focusedField === "name"}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                autoCapitalize="words"
                colors={colors}
                isDarkMode={isDarkMode}
              />
            )}

            <AuthInput
              label="Email Address"
              placeholder="example@icloud.com"
              value={email}
              onChangeText={setEmail}
              isFocused={focusedField === "email"}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              colors={colors}
              isDarkMode={isDarkMode}
            />

            <AuthInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              isFocused={focusedField === "password"}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              colors={colors}
              isDarkMode={isDarkMode}
            />

            {!isSignUp && onForgotPassword && (
              <TouchableOpacity onPress={onForgotPassword} style={styles.forgotPasswordContainer} activeOpacity={0.7}>
                <Text style={[styles.forgotPasswordText, { color: colors.accent }]}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            {formError && (
              <Text style={[styles.errorText, { color: "#FF3B30" }]}>{formError}</Text>
            )}
          </View>

          <AuthSocialProviders
            colors={colors}
          />

          <AuthFooter
            isSignUp={isSignUp}
            isLoading={isLoading}
            colors={colors}
            onSubmit={submit}
            onSwitch={() => setIsSignUp(!isSignUp)}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? 80 : 40,
    paddingBottom: 40,
  },
  formContainer: { marginVertical: 32, gap: 20, marginBottom: 0 },
  forgotPasswordContainer: { alignSelf: "flex-end", paddingVertical: 4 },
  forgotPasswordText: { fontSize: 14, fontWeight: "500" },
  errorText: { fontSize: 14, textAlign: "center", marginTop: 4 },
});