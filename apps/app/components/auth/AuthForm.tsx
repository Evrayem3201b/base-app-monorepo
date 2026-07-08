import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import useColorControl from "@/controllers/color.control";
import { useAuthForm } from "@/hooks/useAuthForm";
import AuthHeader from "./AuthHeader";
import AuthInput from "./AuthInput";
import AuthFooter from "./AuthFooter";
import AuthVerificationNotice from "./AuthVerificationNotice";
import AuthSocialProviders from "./AuthSocialProviders";

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
          
          {/* Header remains anchored at the very top */}
          <AuthHeader isSignUp={isSignUp} colors={colors} />

          {/* 
            We replace the raw spacing setup with a flexible ScrollView.
            This anchors the form items and the social providers into a 
            unified visual block that maintains tight, balanced relational spacing.
          */}
          <ScrollView 
            style={styles.scrollStyle}
            contentContainerStyle={styles.scrollContent}
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formContentGroup}>
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
                <TouchableOpacity 
                  onPress={onForgotPassword} 
                  style={styles.forgotPasswordContainer} 
                  activeOpacity={0.7}
                >
                  <Text style={[styles.forgotPasswordText, { color: colors.accent }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}

              {formError && (
                <Text style={[styles.errorText, { color: "#FF3B30" }]}>{formError}</Text>
              )}

              {/* 
                Social providers are explicitly attached immediately under the form elements.
                This creates an undeniable link between typing or clicking OAuth.
              */}
              <View style={styles.socialWrapper}>
                <AuthSocialProviders colors={colors} />
              </View>
            </View>
          </ScrollView>

          {/* Footer remains nicely grounded right at the bottom */}
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
  container: { 
    flex: 1 
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 64 : 40,
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
  },
  scrollStyle: {
    flex: 1,
    marginVertical: 16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center", // Keeps the main interactive items centered as a unified group
  },
  formContentGroup: {
    width: "100%",
    gap: 18, // Clean token scaling across all inner operational controls
  },
  forgotPasswordContainer: { 
    alignSelf: "flex-end", 
    paddingVertical: 2 
  },
  forgotPasswordText: { 
    fontSize: 13, 
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  errorText: { 
    fontSize: 14, 
    textAlign: "center", 
    marginTop: 2,
    fontWeight: "500"
  },
  socialWrapper: {
    marginTop: 12, // Distinct layout separation showing it is a secondary sign-in method
  },
});