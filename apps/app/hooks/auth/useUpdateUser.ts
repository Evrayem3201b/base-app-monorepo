import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth/auth-client";

interface UpdateUserPayload {
  name?: string;
  image?: string;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateUserPayload) => {
      const { data, error } = await authClient.updateUser({
        name: payload.name,
        image: payload.image,
      });

      if (error) {
        throw new Error(error.message || "An error occurred while updating profile data.");
      }

      return data;
    },
    onSuccess: async () => {
      /**
       * FIX 1: Better Auth's background session storage execution in Expo/AsyncStorage
       * can occasionally finish right after the mutation promise resolves.
       * Adding a micro-delay ensures storage writes finish, or we can explicitly pull 
       * a session refresh to lock token parity before hitting your custom API.
       */
      await authClient.getSession(); 

      /**
       * FIX 2: Explicitly clear the specific layout cache and force a hard refetch.
       * Sometimes invalidateQueries simply marks data stale, but with long staleTimes 
       * or custom fetch properties, an explicit reset or refetch execution ensures parity.
       */
      await queryClient.resetQueries({ queryKey: ["userData"] });
    },
  });
}