const PRIMARY = "#0B5CAD";

const common = {
  accent: PRIMARY,
};

export default {
  light: {
    ...common,

    // Foundation
    text: "#000000",
    textSecondary: "#636366",
    secondaryText: "#636366", // Backwards compatibility
    background: "#FFFFFF",
    card: "#FFFFFF",
    border: "#E5E5EA",

    // Navigation
    tint: PRIMARY,
    tabIconDefault: "#C7C7CC",
    tabIconSelected: PRIMARY,

    // Inputs
    inputBg: "#F2F2F7",
    inputBorder: "#E5E5EA",
    inputFocus: PRIMARY,

    // Buttons
    buttonBg: PRIMARY,
    buttonText: "#FFFFFF",

    // Feedback
    error: "#FF3B30",
    errorBg: "rgba(255, 59, 48, 0.08)",
    success: "#34C759",
    successBg: "rgba(52, 199, 89, 0.08)",
  },

  dark: {
    ...common,

    // Foundation
    text: "#FFFFFF",
    textSecondary: "#A1A1AA",
    secondaryText: "#A1A1AA", // Backwards compatibility
    background: "#0b0b0b",
    card: "#1C1C1E",
    border: "#2C2C2E",
    
    icon: "#1b1b1d6d",

    // Navigation
    tint: "#FFFFFF",
    tabIconDefault: "#48484A",
    tabIconSelected: "#FFFFFF",

    // Inputs
    inputBg: "#1C1C1E",
    inputBorder: "#2C2C2E",
    inputFocus: PRIMARY,

    // Buttons
    buttonBg: PRIMARY,
    buttonText: "#FFFFFF",

    // Feedback
    error: "#FF453A",
    errorBg: "rgba(255, 69, 58, 0.12)",
    success: "#30D158",
    successBg: "rgba(48, 209, 88, 0.12)",
  },
} as const;