import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ActivityIndicator } from 'react-native';

import { ThemeProvider as AppThemeProvider, useTheme } from "@/contexts/ThemeContext";


import { useColorScheme } from '@/components/useColorScheme';
import { authClient } from '@/lib/auth/auth-client';

import { SideMenuProvider } from "@/contexts/SideMenuContext";
import SideMenu from "@/components/nav/SideMenu";
import TopNavBar from "@/components/nav/NavBar";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { data: session, isPending } = authClient.useSession();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (isPending || !loaded) {
    return <ActivityIndicator />;
  }

  const isAuthenticated = !!session;
  const isAdmin = isAuthenticated && (session.user as any).role === 'admin';

  return (
    <AppThemeProvider>
  <RootLayoutNav isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
  </AppThemeProvider>
  );
}

function RootLayoutNav({ isAuthenticated, isAdmin }: { isAuthenticated: boolean; isAdmin: boolean }) {
  const colorScheme = useColorScheme();
  const { isThemeLoading } = useTheme();

  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (!isThemeLoading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isThemeLoading]);

  if (isThemeLoading) return null;

  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SideMenuProvider>
      <Stack
        screenOptions={{
          header: (props) => (
            <TopNavBar title={props.options.title ?? props.route.name} />
          ),
        }}
      >
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(settings)/Profile" options={{ title: "Profile" }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: "Details" }} />
        </Stack.Protected>

        <Stack.Protected guard={isAdmin}>
          <Stack.Screen name="(admin)" options={{ title: "Admin" }} />
        </Stack.Protected>

        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)/AuthScreen" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      {isAuthenticated && <SideMenu />}
      </SideMenuProvider>
    </ThemeProvider>
    </QueryClientProvider>
  );
}