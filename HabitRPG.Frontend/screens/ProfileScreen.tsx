import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { colors, spacing, fontSize } from "../constants/theme"
import { useAuth } from "../context/AuthContext"

export default function ProfileScreen() {
  const { logout } = useAuth();

  const handleSubmit = async () => {
    try {
        await logout();
    } catch (error) {
        console.log("Auth error handled by context");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Character settings</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleSubmit}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  logoutButton: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: colors.textPrimary,
    fontWeight: "bold",
    fontSize: fontSize.md,
    textAlign: "center",
  },
});
