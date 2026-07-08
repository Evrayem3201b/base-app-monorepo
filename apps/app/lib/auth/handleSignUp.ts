
import { authClient } from "./auth-client";

type Props = {
  email: string;
  password: string;
  name: string;
};

type AuthResult<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: { message: string; code?: string } };

export async function handleSignUp({
  email,
  password,
  name,
}: Props): Promise<AuthResult<Awaited<ReturnType<typeof authClient.signUp.email>>["data"]>> {
  try {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

 
      console.log("SignUp Data:", data);
      console.log("SignUp Error:", error);
    

    if (error) {
      return {
        success: false,
        data: null,
        error: {
          message: error.message ?? "Sign up failed. Please try again.",
          code: error.code,
        },
      };
    }

    if (!data) {
      return {
        success: false,
        data: null,
        error: { message: "Sign up returned no data." },
      };
    }

    return { success: true, data, error: null };
  } catch (err) {
    // Network failure, timeout, or unexpected thrown error
    if (process.env.IN_DEVELOPMENT === "true") {
      console.error("SignUp unexpected error:", err);
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