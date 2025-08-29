"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HabitCard } from "@/components/habits/habit-card"
import { Plus, Filter, Archive } from "lucide-react"

export function HabitsScreen() {
  const [showInactive, setShowInactive] = useState(false)

  // Mock data - in real app, fetch from API
  const habits = [
    {
      id: 1,
      title: "Morning Meditation",
      description: "10 minutes of mindfulness",
      difficulty: "Easy" as const,
      xpReward: 5,
      completed: true,
      streak: 7,
      active: true,
    },
    {
      id: 2,
      title: "Read for 30 minutes",
      description: "Continue current book",
      difficulty: "Medium" as const,
      xpReward: 10,
      completed: false,
      streak: 12,
      active: true,
    },
    {
      id: 3,
      title: "Exercise",
      description: "Full body workout",
      difficulty: "Hard" as const,
      xpReward: 20,
      completed: false,
      streak: 3,
      active: true,
    },
    {
      id: 4,
      title: "Learn Spanish",
      description: "Practice vocabulary",
      difficulty: "Medium" as const,
      xpReward: 10,
      completed: false,
      streak: 0,
      active: false,
    },
  ]

  const activeHabits = habits.filter((h) => h.active)
  const inactiveHabits = habits.filter((h) => !h.active)
  const displayHabits = showInactive ? inactiveHabits : activeHabits

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-card-foreground">My Habits</h1>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant={!showInactive ? "default" : "outline"}
            size="sm"
            onClick={() => setShowInactive(false)}
            className="text-xs"
          >
            <Filter className="w-3 h-3 mr-1" />
            Active ({activeHabits.length})
          </Button>
          <Button
            variant={showInactive ? "default" : "outline"}
            size="sm"
            onClick={() => setShowInactive(true)}
            className="text-xs"
          >
            <Archive className="w-3 h-3 mr-1" />
            Inactive ({inactiveHabits.length})
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">{showInactive ? "Inactive Habits" : "Active Habits"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {displayHabits.length > 0 ? (
              displayHabits.map((habit) => <HabitCard key={habit.id} habit={habit} />)
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">{showInactive ? "No inactive habits" : "No active habits yet"}</p>
                {!showInactive && (
                  <Button className="mt-4 bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-1" />
                    Create Your First Habit
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
