import { authClient } from "@/lib/auth/auth-client";

export function useUserData() {
  const session = authClient.useSession();

  if (session.isPending) {
    return {
      user: null,
      session: null,
      isLoading: true,
      refetch: session.refetch,
    };
  }

  if (session.error) {
    throw session.error;
  }

  if (!session.data?.user || !session.data?.session) {
    throw new Error("User is not authenticated.");
  }

  return {
    user: session.data.user,
    session: session.data.session,
    isLoading: false,
    refetch: session.refetch,
  };
}