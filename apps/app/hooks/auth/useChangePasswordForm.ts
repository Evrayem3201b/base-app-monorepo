import { useState, useRef, useEffect } from "react";

import { changePasswordSchema } from "@/schemas/auth/auth.schema";
import { authClient } from "@/lib/auth/auth-client";

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_PASSWORD: "Your current password is incorrect.",
  WEAK_PASSWORD: "Please choose a stronger password (at least 8 characters).",
};

export function useChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  function resolveErrorMessage(error: { code?: string; status?: number; message?: string }): string {
    if (error.status === 429) {
      return "Too many attempts. Please wait a moment and try again.";
    }
    if (error.code && ERROR_MESSAGES[error.code]) {
      return ERROR_MESSAGES[error.code];
    }
    return error.message || "Could not change password. Please try again.";
  }

  async function submit() {
    if (isLoading) return;

    setFormError(null);
    setSuccess(false);

    const result = changePasswordSchema.safeParse({ currentPassword, newPassword });
    if (!result.success) {
      setFormError(result.error.issues[0]?.message ?? "Please check your input.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.changePassword({
        currentPassword: result.data.currentPassword,
        newPassword: result.data.newPassword,
        revokeOtherSessions: true,
      });

      if (!isMounted.current) return;
      setIsLoading(false);

      if (error) {
        setFormError(resolveErrorMessage(error));
        return;
      }

      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      if (isMounted.current) {
        setIsLoading(false);
        setFormError("Network error. Check your connection and try again.");
      }
    }
  }

  return {
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
  };
}