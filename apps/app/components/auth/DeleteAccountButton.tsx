// components/auth/DeleteAccountButton.tsx
import React, { useState } from "react";
import { TouchableOpacity, Text, Alert, StyleSheet, TextInput, Modal, View } from "react-native";
import { authClient } from "@/lib/auth/auth-client";
import Button from "../ui/Button";

export default function DeleteAccountButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");

  function confirmDelete() {
    Alert.alert(
      "Delete Account",
      "This will permanently delete your account and all associated data. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", style: "destructive", onPress: () => setModalVisible(true) },
      ]
    );
  }

  async function handleDelete() {
  try {
    const { error } = await authClient.deleteUser({ password });

    if (error) {
      Alert.alert(
        "Delete Failed",
        error.message || "Unable to delete your account. Please try again."
      );
      return;
    }

    setModalVisible(false);

    // Better Auth will clear the session automatically.
    // Your auth listener/root layout should redirect to the auth screens.
  } catch (err) {
    // console.error("Failed to delete account:", err);

    Alert.alert(
      "Unexpected Error",
      "Something went wrong while deleting your account. Please try again."
    );
  }
}

  return (
    <>
      <Button label="Delete Account" variant="danger" onPress={confirmDelete} />
  
    

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>Confirm your password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleDelete}>
              <Text style={styles.confirmText}>Delete Permanently</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10, backgroundColor: "#FF3B30" },
  text: { color: "#fff", fontWeight: "600" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 24 },
  modal: { backgroundColor: "#fff", borderRadius: 14, padding: 20, gap: 12 },
  title: { fontSize: 17, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },
  confirmButton: { backgroundColor: "#FF3B30", padding: 12, borderRadius: 8, alignItems: "center" },
  confirmText: { color: "#fff", fontWeight: "600" },
  cancelText: { textAlign: "center", color: "#666", padding: 8 },
});