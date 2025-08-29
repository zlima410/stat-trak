import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors, spacing, borderRadius, fontSize } from "../constants/theme"

export default function QuickActions() {
  const actions = [
    { icon: "add-circle", label: "New Habit", color: colors.primary },
    { icon: "checkmark-circle", label: "Quick Complete", color: colors.success },
    { icon: "stats-chart", label: "View Stats", color: colors.gold },
    { icon: "settings", label: "Settings", color: colors.textSecondary },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action, index) => (
          <TouchableOpacity key={index} style={styles.actionButton}>
            <Ionicons name={action.icon as any} size={24} color={action.color} />
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    backgroundColor: colors.surfaceBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  actionLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: "center",
  },
})
