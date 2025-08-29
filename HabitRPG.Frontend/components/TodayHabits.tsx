import { View, Text, StyleSheet, FlatList } from "react-native"
import HabitCard from "./HabitCard"
import { colors, spacing, borderRadius, fontSize } from "../constants/theme"

export default function TodayHabits() {
  const todayHabits = [
    {
      id: "1",
      title: "Morning Meditation",
      difficulty: "Easy",
      xpReward: 10,
      completed: true,
      streak: 7,
    },
    {
      id: "2",
      title: "Read for 30 minutes",
      difficulty: "Medium",
      xpReward: 20,
      completed: false,
      streak: 12,
    },
    {
      id: "3",
      title: "Exercise",
      difficulty: "Hard",
      xpReward: 30,
      completed: false,
      streak: 5,
    },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Habits</Text>
      <FlatList
        data={todayHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HabitCard habit={item} />}
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
})
