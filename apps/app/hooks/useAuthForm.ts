// hooks/useAuthForm.ts
import { useState } from "react";
import { handleSignUp } from "../lib/auth/handleSignUp";
import { handleSignIn } from "../lib/auth/handleSignIn";
import { authClient } from "../lib/auth/auth-client";

export function useAuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [verificationPending, setVerificationPending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);

  async function submit() {
    setFormError(null);

    if (!email || !password || (isSignUp && !name)) {
      setFormError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    const result = isSignUp
      ? await handleSignUp({ email, password, name })
      : await handleSignIn({ email, password });
    setIsLoading(false);

    if (!result.success) {
      // Better Auth returns this specific code when sign-in is blocked pending verification
      if (result.error.code === "EMAIL_NOT_VERIFIED") {
        setVerificationPending(true);
        return;
      }
      setFormError(result.error.message);
      return;
    }

    if (isSignUp) {
      // sign-up succeeded but requireEmailVerification blocks real access until confirmed
      setVerificationPending(true);
    }
  }

  async function resendVerification() {
    if (resendCooldown) return;
    setResendCooldown(true);
    setFormError(null);

    try {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: "/",
      });
    } catch (err) {
      setFormError("Couldn't resend the email. Try again in a moment.");
    }

    setTimeout(() => setResendCooldown(false), 30_000); // basic 30s cooldown
  }

  return {
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
  };
}