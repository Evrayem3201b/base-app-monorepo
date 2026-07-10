import { AsyncStorageKeys } from "@/constants/KEYS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Appearance } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  isThemeLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
  isThemeLoading: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    () => (Appearance.getColorScheme() as Theme) ?? "light",
  );
  const [isThemeLoading, setIsThemeLoading] = useState(true);

  // Load persisted theme once on mount — no reactive subscriptions
  useEffect(() => {
    AsyncStorage.getItem(AsyncStorageKeys.theme)
      .then((stored) => {
        if (stored === "light" || stored === "dark") {
          setTheme(stored);
          Appearance.setColorScheme(stored);
        }
      })
      .finally(() => setIsThemeLoading(false));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      // Fire and forget — don't await, don't block render
      Appearance.setColorScheme(next);
      AsyncStorage.setItem(AsyncStorageKeys.theme, next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, isDark: theme === "dark", toggleTheme, isThemeLoading }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return use(ThemeContext);
}
