import { View, Text, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import XPProgressBar from "./XPProgressBar"
import { colors, spacing, borderRadius, fontSize } from "../constants/theme"

export default function PlayerStats() {
  const playerData = {
    username: "Hero",
    level: 12,
    currentXP: 750,
    xpToNextLevel: 1000,
    totalStreak: 45,
    todayStreak: 3,
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.playerInfo}>
          <Text style={styles.username}>{playerData.username}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>LVL {playerData.level}</Text>
          </View>
        </View>
        <View style={styles.streakContainer}>
          <Ionicons name="flame" size={20} color={colors.fire} />
          <Text style={styles.streakText}>{playerData.totalStreak}</Text>
        </View>
      </View>

      <XPProgressBar currentXP={playerData.currentXP} maxXP={playerData.xpToNextLevel} />

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="trending-up" size={16} color={colors.success} />
          <Text style={styles.statLabel}>Today's Streak</Text>
          <Text style={styles.statValue}>{playerData.todayStreak}</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="star" size={16} color={colors.gold} />
          <Text style={styles.statLabel}>XP Today</Text>
          <Text style={styles.statValue}>+125</Text>
        </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: fontSize.xl,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginRight: spacing.md,
  },
  levelBadge: {
    backgroundColor: colors.gold,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  levelText: {
    fontSize: fontSize.sm,
    fontWeight: "bold",
    color: colors.background,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    fontSize: fontSize.lg,
    fontWeight: "bold",
    color: colors.fire,
    marginLeft: spacing.xs,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: spacing.md,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statValue: {
    fontSize: fontSize.md,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
})
