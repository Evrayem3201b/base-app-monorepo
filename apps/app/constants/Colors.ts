const tintColorLight = "#007AFF";
const tintColorDark = "#FFFFFF";

export default {
  light: {
    // Foundational Core
    text: "#000000",
    textSecondary: "#636366", // Added: Used for subtitle notes and secondary text fields
    background: "#FFFFFF",
    card: "#FFFFFF",          // Added: White background surface for elevated layout blocks/social buttons
    border: "#E5E5EA",        // Added: Crisp, clean structural component border token
    tint: tintColorLight,
    
    // Tab Navigation
    tabIconDefault: "#C7C7CC",
    tabIconSelected: tintColorLight,
    
    // Premium Interactive Form Elements
    secondaryText: "#636366", // Kept for backward compatibility
    inputBg: "#F2F2F7",
    inputBorder: "#E5E5EA",
    inputFocus: "#000000",
    buttonBg: "#000000",
    buttonText: "#FFFFFF",
    accent: "#007AFF",
    
    // Feedback States (Alerts & Validation Notices)
    error: "#FF3B30",         // System Red
    errorBg: "rgba(255, 59, 48, 0.08)",  // Soft red tint for error card fills
    success: "#34C759",       // System Green
    successBg: "rgba(52, 199, 89, 0.08)", // Soft green tint for success notice fills
  },
  dark: {
    // Foundational Core
    text: "#FFFFFF",
    textSecondary: "#8E8E93", // Added: Accessible low-contrast text for pure black environments
    background: "#000000",    // True OLED Black background architecture
    card: "#1C1C1E",          // Added: Subtle gray elevation wrapper over deep black backgrounds
    border: "#2C2C2E",        // Added: High-contrast border separation rule
    tint: tintColorDark,
    
    // Tab Navigation
    tabIconDefault: "#48484A",
    tabIconSelected: tintColorDark,
    
    // Premium Interactive Form Elements
    secondaryText: "#8E8E93", // Kept for backward compatibility
    inputBg: "#1C1C1E",
    inputBorder: "#2C2C2E",
    inputFocus: "#FFFFFF",
    buttonBg: "#FFFFFF",
    buttonText: "#000000",
    accent: "#0A84FF",        // Bright Apple system accessibility blue
    
    // Feedback States (Alerts & Validation Notices)
    error: "#FF453A",         // High-accessibility dark mode red
    errorBg: "rgba(255, 69, 58, 0.12)",
    success: "#30D158",       // High-accessibility dark mode green
    successBg: "rgba(48, 209, 88, 0.12)",
  },
};