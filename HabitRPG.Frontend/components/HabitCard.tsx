import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors, spacing, borderRadius, fontSize } from "../constants/theme"

interface Habit {
  id: string
  title: string
  difficulty: string
  xpReward: number
  completed: boolean
  streak: number
}

interface HabitCardProps {
  habit: Habit
}

export default function HabitCard({ habit }: HabitCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return colors.success
      case "medium":
        return colors.warning
      case "hard":
        return colors.danger
      default:
        return colors.textSecondary
    }
  }

  return (
    <View style={[styles.container, habit.completed && styles.completedContainer]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, habit.completed && styles.completedText]}>{habit.title}</Text>
          <TouchableOpacity style={[styles.completeButton, habit.completed && styles.completedButton]}>
            <Ionicons
              name={habit.completed ? "checkmark-circle" : "checkmark-circle-outline"}
              size={24}
              color={habit.completed ? colors.success : colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={[styles.difficulty, { color: getDifficultyColor(habit.difficulty) }]}>{habit.difficulty}</Text>
            <Text style={styles.xpReward}>+{habit.xpReward} XP</Text>
          </View>

          <View style={styles.streakContainer}>
            <Ionicons name="flame" size={16} color={colors.fire} />
            <Text style={styles.streakText}>{habit.streak}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceBackground,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  completedContainer: {
    opacity: 0.7,
    borderColor: colors.success,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.textPrimary,
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },
  completeButton: {
    padding: spacing.xs,
  },
  completedButton: {
    backgroundColor: colors.success + "20",
    borderRadius: borderRadius.sm,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  difficulty: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    marginRight: spacing.md,
  },
  xpReward: {
    fontSize: fontSize.sm,
    color: colors.gold,
    fontWeight: "600",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    fontSize: fontSize.sm,
    color: colors.fire,
    fontWeight: "600",
    marginLeft: spacing.xs,
  },
})
