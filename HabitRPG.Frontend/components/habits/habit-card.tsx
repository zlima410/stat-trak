"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Flame, Zap } from "lucide-react"

interface Habit {
  id: number
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  xpReward: number
  completed: boolean
  streak: number
}

interface HabitCardProps {
  habit: Habit
}

export function HabitCard({ habit }: HabitCardProps) {
  const difficultyColors = {
    Easy: "text-success",
    Medium: "text-warning",
    Hard: "text-destructive",
  }

  const handleComplete = () => {
    // Mock completion - in real app, call API
    console.log(`Completing habit: ${habit.title}`)
  }

  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        habit.completed ? "bg-success/10 border-success/20" : "bg-muted/30 border-border hover:bg-muted/50"
      }`}
    >
      <div className="flex items-start gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleComplete}
          disabled={habit.completed}
          className="p-0 h-auto hover:bg-transparent"
        >
          {habit.completed ? (
            <CheckCircle className="w-6 h-6 text-success" />
          ) : (
            <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold ${habit.completed ? "text-success line-through" : "text-card-foreground"}`}>
              {habit.title}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[habit.difficulty]} bg-current/10`}>
              {habit.difficulty}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-2">{habit.description}</p>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-muted-foreground">+{habit.xpReward} XP</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-streak-fire" />
              <span className="text-muted-foreground">{habit.streak} day streak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
