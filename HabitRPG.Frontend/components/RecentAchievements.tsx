import { View, Text, StyleSheet, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors, spacing, borderRadius, fontSize } from "../constants/theme"

export default function RecentAchievements() {
  const achievements = [
    {
      id: "1",
      title: "Week Warrior",
      description: "Complete habits for 7 days straight",
      icon: "trophy",
      earned: true,
    },
    {
      id: "2",
      title: "Early Bird",
      description: "Complete morning routine 5 times",
      icon: "sunny",
      earned: true,
    },
    {
      id: "3",
      title: "Consistency King",
      description: "Maintain a 30-day streak",
      icon: "medal",
      earned: false,
    },
  ]

  const renderAchievement = ({ item }: { item: (typeof achievements)[0] }) => (
    <View style={[styles.achievementItem, !item.earned && styles.lockedAchievement]}>
      <Ionicons name={item.icon as any} size={24} color={item.earned ? colors.gold : colors.textMuted} />
      <View style={styles.achievementText}>
        <Text style={[styles.achievementTitle, !item.earned && styles.lockedText]}>{item.title}</Text>
        <Text style={[styles.achievementDescription, !item.earned && styles.lockedText]}>{item.description}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={renderAchievement}
        scrollEnabled={false}
      />
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
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.surfaceBackground,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  achievementTitle: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  achievementDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  lockedText: {
    color: colors.textMuted,
  },
})
