import { ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import PlayerStats from "../components/PlayerStats"
import QuickActions from "../components/QuickActions"
import TodayHabits from "../components/TodayHabits"
import RecentAchievements from "../components/RecentAchievements"
import { colors, spacing } from "../constants/theme"

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <PlayerStats />
        <QuickActions />
        <TodayHabits />
        <RecentAchievements />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
})
