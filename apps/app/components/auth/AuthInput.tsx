import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, TextInputProps, TouchableOpacity } from "react-native";
import { Ionicons } from '@react-native-vector-icons/ionicons';

interface AuthInputProps extends TextInputProps {
  label: string;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  colors: any;
  isDarkMode: boolean;
}

export default function AuthInput({
  label,
  isFocused,
  onFocus,
  onBlur,
  colors,
  isDarkMode,
  secureTextEntry,
  ...inputProps
}: AuthInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = !!secureTextEntry;

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: colors.secondaryText }]}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input,
            isPasswordField && styles.inputWithIcon,
            {
              backgroundColor: colors.inputBg,
              color: colors.text,
              borderColor: isFocused ? colors.inputFocus : colors.inputBorder,
            },
          ]}
          placeholderTextColor={isDarkMode ? "#48484A" : "#AEAEB2"}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={isPasswordField && !isPasswordVisible}
          {...inputProps}
        />

        {isPasswordField && (
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color={colors.secondaryText}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 6 },
  label: {
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    paddingLeft: 4,
  },
  inputRow: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1.5,
    letterSpacing: -0.2,
  },
  inputWithIcon: {
    paddingRight: 44, // room for the toggle icon
  },
  toggleButton: {
    position: "absolute",
    right: 14,
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});