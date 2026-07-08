import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/lib/auth/auth-client";
import { apiClient } from "@/lib/auth/api-client";

export function useUserData() {
    const query = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const sessionCookie = authClient.getCookie();
            const response = await apiClient.api.user.$get({}, {
                headers: {
            // Forward the cookie string so your server's requireAuth middleware can validate it
            Cookie: sessionCookie || "",
          },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
      return data.user;
        },
        retry: false, 
    staleTime: 1000 * 60 * 5,
    });

    return query;
}