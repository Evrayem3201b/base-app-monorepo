import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
import { useColorScheme } from "react-native";

export default function useColorControl(){
    const { isDark, toggleTheme, isThemeLoading } = useTheme();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme === "dark" ? "dark" : "light"];
    return {colors, isDark, toggleTheme, isThemeLoading};
}