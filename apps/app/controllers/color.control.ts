import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

export default function useColorControl(){
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme === "dark" ? "dark" : "light"];
    return {colors, isDarkMode: colorScheme === "dark"};
}