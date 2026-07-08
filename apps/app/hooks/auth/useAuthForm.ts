// hooks/useAuthForm.ts
import { useState, useRef, useEffect } from "react";
import { handleSignUp } from "../../lib/auth/handleSignUp";
import { handleSignIn } from "../../lib/auth/handleSignIn";
import { authClient } from "../../lib/auth/auth-client";
import { signInSchema, signUpSchema, SignInOrSignUp } from "@/schemas/auth/auth.schema";
import { z } from "zod";

// Known Better Auth error codes mapped to friendlier copy.
// Fall back to result.error.message for anything not listed here.
const ERROR_MESSAGES: Record<string, string> = {
  USER_ALREADY_EXISTS: "An account with this email already exists.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "An account with this email already exists.",
  INVALID_EMAIL_OR_PASSWORD: "Incorrect email or password.",
  INVALID_PASSWORD: "Incorrect password.",
  INVALID_EMAIL: "Please enter a valid email address.",
  BANNED_USER: "This account has been suspended.",
  EMAIL_NOT_VERIFIED: "Please verify your email before signing in.",
  WEAK_PASSWORD: "Please choose a stronger password (at least 8 characters).",
};

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

  const isMounted = useRef(true);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
    };
  }, []);

  function validate(): { data?: SignInOrSignUp; error?: string } {
    const schema = isSignUp ? signUpSchema : signInSchema;
    const result = schema.safeParse({ email, password, name });

    if (!result.success) {
      // surface the first issue only — good enough for a single formError string
      const firstIssue = result.error.issues[0];
      return { error: firstIssue?.message ?? "Please check your input." };
    }

    return { data: result.data };
  }

  function resolveErrorMessage(error: { code?: string; status?: number; message?: string }): string {
    if (error.status === 429) {
      return "Too many attempts. Please wait a moment and try again.";
    }
    if (error.code && ERROR_MESSAGES[error.code]) {
      return ERROR_MESSAGES[error.code];
    }
    return error.message || "Something went wrong. Please try again.";
  }

  async function submit() {
    if (isLoading) return; // guard against double-submit

    setFormError(null);

    const { data, error: validationError } = validate();
    if (validationError || !data) {
      setFormError(validationError ?? "Please check your input.");
      return;
    }

    setIsLoading(true);

    let result;
    try {
      result = isSignUp
        ? await handleSignUp(data as z.infer<typeof signUpSchema>)
        : await handleSignIn(data as z.infer<typeof signInSchema>);
    } catch (err) {
      if (isMounted.current) {
        setIsLoading(false);
        setFormError("Network error. Check your connection and try again.");
      }
      return;
    }

    if (!isMounted.current) return;
    setIsLoading(false);

    if (!result.success) {
      if (result.error.code === "EMAIL_NOT_VERIFIED") {
        setVerificationPending(true);
        return;
      }
      setFormError(resolveErrorMessage(result.error));
      return;
    }

    if (isSignUp) {
      setVerificationPending(true);
    }
  }

  async function resendVerification() {
    if (resendCooldown || !email.trim()) return;

    setResendCooldown(true);
    setFormError(null);

    try {
      const { error } = await authClient.sendVerificationEmail({
        email: email.trim().toLowerCase(),
        callbackURL: "/",
      });
      if (error && isMounted.current) {
        setFormError(resolveErrorMessage(error));
      }
    } catch (err) {
      if (isMounted.current) {
        setFormError("Couldn't resend the email. Check your connection and try again.");
      }
    }

    cooldownTimer.current = setTimeout(() => {
      if (isMounted.current) setResendCooldown(false);
    }, 30_000);
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