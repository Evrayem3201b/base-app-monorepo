
import { authClient } from "./auth-client";

type Props = {
  email: string;
  password: string;
};

type AuthResult<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: { message: string; code?: string } };

export async function handleSignIn({
  email,
  password,
}: Props): Promise<AuthResult<Awaited<ReturnType<typeof authClient.signIn.email>>["data"]>> {
  try {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (process.env.IN_DEVELOPMENT === "true") {
      console.log("SignIn Data:", data);
      console.log("SignIn Error:", error);
    }

    if (error) {
      return {
        success: false,
        data: null,
        error: {
          message: error.message ?? "Invalid email or password.",
          code: error.code,
        },
      };
    }

    if (!data) {
      return {
        success: false,
        data: null,
        error: { message: "Sign in returned no data." },
      };
    }

    return { success: true, data, error: null };
  } catch (err) {
    if (process.env.IN_DEVELOPMENT === "true") {
      console.error("SignIn unexpected error:", err);
    }
    return {
      success: false,
      data: null,
      error: {
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Check your connection and try again.",
      },
    };
  }
}