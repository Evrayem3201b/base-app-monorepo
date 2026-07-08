import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import AdminDashboardLink from "@/components/auth/AdminDashboardLink";
import SignOutButton from "@/components/auth/SignOutButton";
import DeleteAccountButton from "@/components/auth/DeleteAccountButton";
import { useUserData } from "@/hooks/auth/useUserData";

export default function TabOneScreen() {
  const userData = useUserData();
  return (
    <View style={styles.container}>
      <Text>Hello {userData.data?.name || "there"}, You are logged in!</Text>
      <AdminDashboardLink />
      <SignOutButton />
      <DeleteAccountButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});