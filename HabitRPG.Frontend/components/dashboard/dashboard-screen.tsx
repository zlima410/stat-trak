"use client"

import { PlayerStats } from "@/components/player/player-stats"
import { TodayHabits } from "@/components/habits/today-habits"
import { RecentAchievements } from "@/components/achievements/recent-achievements"
import { QuickActions } from "@/components/dashboard/quick-actions"

export function DashboardScreen() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <h1 className="text-2xl font-bold text-card-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Adventurer!</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        <PlayerStats />
        <QuickActions />
        <TodayHabits />
        <RecentAchievements />
      </div>
    </div>
  )
}
