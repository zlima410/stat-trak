"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HabitCard } from "@/components/habits/habit-card"

export function TodayHabits() {
  // Mock data - in real app, fetch from API
  const todayHabits = [
    {
      id: 1,
      title: "Morning Meditation",
      description: "10 minutes of mindfulness",
      difficulty: "Easy" as const,
      xpReward: 5,
      completed: true,
      streak: 7,
    },
    {
      id: 2,
      title: "Read for 30 minutes",
      description: "Continue current book",
      difficulty: "Medium" as const,
      xpReward: 10,
      completed: false,
      streak: 12,
    },
    {
      id: 3,
      title: "Exercise",
      description: "Full body workout",
      difficulty: "Hard" as const,
      xpReward: 20,
      completed: false,
      streak: 3,
    },
  ]

  const completedCount = todayHabits.filter((h) => h.completed).length
  const totalCount = todayHabits.length

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center justify-between">
          Today's Quests
          <span className="text-sm font-normal text-muted-foreground">
            {completedCount}/{totalCount} completed
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {todayHabits.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </CardContent>
    </Card>
  )
}
