import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { CheckCircle, Circle, Flame, Zap } from "lucide-react-native";
import { colors, spacing, fontSize, borderRadius } from "../constants/theme";
import { Habit, GameReward, ApiError, HabitDifficulty } from "../types/types";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

interface HabitCardProps {
  habit: Habit;
  onComplete?: (habitId: number, reward: GameReward) => void;
  onUpdate?: (updatedHabit: Habit) => void;
}

export default function HabitCard({ habit, onComplete, onUpdate }: HabitCardProps) {
  const { user } = useAuth();
  const [isCompleting, setIsCompleting] = useState(false);

  const getDifficultyConfig = (difficulty: HabitDifficulty) => {
    switch (difficulty) {
      case HabitDifficulty.Easy:
        return {
          label: "Easy",
          color: colors.success,
          xp: 5,
        };
      case HabitDifficulty.Medium:
        return {
          label: "Medium",
          color: colors.warning,
          xp: 10,
        };
      case HabitDifficulty.Hard:
        return {
          label: "Hard",
          color: colors.danger,
          xp: 20,
        };
      default:
        console.warn(`Unknown difficulty level: ${difficulty} for habit: ${habit.title}`);
        return {
          label: "Medium",
          color: colors.warning,
          xp: 10,
        };
    }
  };

  const currentDifficulty = getDifficultyConfig(habit.difficulty)
  const isCompleted = !habit.canCompleteToday && !!habit.lastCompletedAt;
  const isDisabled = isCompleting || isCompleted || !habit.canCompleteToday || !habit.isActive;

  const handleComplete = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to complete habits");
      return;
    }

    if (isCompleted || !habit.canCompleteToday) {
      Alert.alert("Already Completed", "You've already completed this habit today!");
      return;
    }

    if (!habit.isActive) {
      Alert.alert("Inactive Habit", "This habit is inactive and cannot be completed");
      return;
    }

    try {
      setIsCompleting(true);
      console.log(`🚀 Completing habit: ${habit.title} (ID: ${habit.id})`);

      const response = await api.post(`/habits/${habit.id}/complete`);
      const reward: GameReward = response.data;

      if (reward.success) {
        console.log(`✅ Habit completed successfully: +${reward.xpGained} XP`);

        const message = reward.leveledUp ? `🎉 ${reward.message}` : `✨ ${reward.message}`;

        Alert.alert(reward.leveledUp ? "Level Up!" : "Great Job!", message, [{ text: "Awesome!", style: "default" }]);

        if (reward.updatedHabit && onUpdate) {
          const updatedHabit: Habit = {
            ...habit,
            currentStreak: reward.updatedHabit.currentStreak,
            bestStreak: reward.updatedHabit.bestStreak,
            lastCompletedAt: reward.updatedHabit.lastCompletedAt || new Date().toISOString(),
            canCompleteToday: false,
          };
          onUpdate(updatedHabit);
        }

        if (onComplete) {
          onComplete(habit.id, reward);
        }
      } else {
        console.error(`❌ Failed to complete habit: ${reward.message}`);
        Alert.alert("Error", reward.message || "Failed to complete habit");
      }
    } catch (err) {
      console.error("❌ Error completing habit:", err);
      const error = err as ApiError;

      let errorMessage = error.message || "Failed to complete habit";

      if (error.status === 404) {
        errorMessage = "Habit not found or inactive";
      } else if (error.status === 400) {
        errorMessage = error.message || "Habit already completed today";
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setIsCompleting(false);
    }
  };

  const formatLastCompleted = (dateString?: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return "today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        return "yesterday";
      } else {
        const diffTime = Math.abs(today.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days ago`;
      }
    } catch {
      return "";
    }
  };

  return (
    <View style={[styles.container, isCompleted && styles.completedContainer]}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={handleComplete}
          disabled={isDisabled}
        >
          {isCompleting ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : isCompleted ? (
            <CheckCircle size={24} color={colors.success} />
          ) : (
            <Circle size={24} color={habit.canCompleteToday ? colors.primary : colors.textMuted} />
          )}
        </TouchableOpacity>

        <View style={styles.habitInfo}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, isCompleted && styles.completedTitle]}>{habit.title}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: `${currentDifficulty.color}20` }]}>
              <Text style={[styles.difficultyText, { color: currentDifficulty.color }]}>{currentDifficulty.label}</Text>
            </View>
          </View>

          {habit.description && <Text style={styles.description}>{habit.description}</Text>}

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Zap size={16} color={colors.primary} />
              <Text style={styles.statText}>+{currentDifficulty.xp} XP</Text>
            </View>

            <View style={styles.statItem}>
              <Flame size={16} color={colors.fire} />
              <Text style={styles.statText}>{habit.currentStreak} day streak</Text>
            </View>

            {isCompleted && habit.lastCompletedAt && (
              <Text style={styles.completedText}>Completed {formatLastCompleted(habit.lastCompletedAt)}</Text>
            )}
          </View>
        </View>
      </View>

      {!habit.isActive && (
        <View style={styles.inactiveOverlay}>
          <Text style={styles.inactiveText}>Inactive</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  completedContainer: {
    backgroundColor: `${colors.success}10`,
    borderColor: `${colors.success}30`,
  },
  content: {
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkButton: {
    marginRight: spacing.md,
    padding: spacing.xs,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 32,
    minHeight: 32,
  },
  habitInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
    flexWrap: "wrap",
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: "600",
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  completedTitle: {
    color: colors.success,
    textDecorationLine: "line-through",
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.sm,
  },
  difficultyText: {
    fontSize: fontSize.xs,
    fontWeight: "600",
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: fontSize.sm * 1.4,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: spacing.lg,
    marginBottom: spacing.xs,
  },
  statText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
    fontWeight: "500",
  },
  completedText: {
    fontSize: fontSize.xs,
    color: colors.success,
    fontWeight: "500",
    marginLeft: "auto",
  },
  inactiveOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: colors.textMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderBottomLeftRadius: borderRadius.md,
  },
  inactiveText: {
    fontSize: fontSize.xs,
    color: colors.background,
    fontWeight: "600",
  },
});