"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Calendar, Target } from "lucide-react"

export function StatsScreen() {
  // Mock data - in real app, fetch from API
  const statsData = {
    weeklyCompletion: 85,
    monthlyCompletion: 78,
    totalXPThisWeek: 245,
    totalXPThisMonth: 1050,
    bestStreak: 23,
    currentStreak: 7,
    habitsCompletedToday: 3,
    habitsCompletedThisWeek: 18,
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <h1 className="text-2xl font-bold text-card-foreground">Statistics</h1>
        <p className="text-muted-foreground">Track your progress</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Completion Rates */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Completion Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">This Week</span>
                <span className="font-semibold text-card-foreground">{statsData.weeklyCompletion}%</span>
              </div>
              <div className="w-full bg-secondary/30 rounded-full h-2">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${statsData.weeklyCompletion}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">This Month</span>
                <span className="font-semibold text-card-foreground">{statsData.monthlyCompletion}%</span>
              </div>
              <div className="w-full bg-secondary/30 rounded-full h-2">
                <div
                  className="h-full bg-chart-2 rounded-full transition-all duration-500"
                  style={{ width: `${statsData.monthlyCompletion}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* XP Earned */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Experience Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">{statsData.totalXPThisWeek}</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
              <div className="text-center p-4 bg-chart-2/10 rounded-lg">
                <div className="text-2xl font-bold text-chart-2">{statsData.totalXPThisMonth}</div>
                <div className="text-sm text-muted-foreground">This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streaks */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Streaks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-streak-fire/10 rounded-lg">
                <div className="text-2xl font-bold text-streak-fire">{statsData.currentStreak}</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
              <div className="text-center p-4 bg-level-gold/10 rounded-lg">
                <div className="text-2xl font-bold text-level-gold">{statsData.bestStreak}</div>
                <div className="text-sm text-muted-foreground">Best Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Habits Completed */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Target className="w-5 h-5" />
              Habits Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">{statsData.habitsCompletedToday}</div>
                <div className="text-sm text-muted-foreground">Today</div>
              </div>
              <div className="text-center p-4 bg-chart-3/10 rounded-lg">
                <div className="text-2xl font-bold text-chart-3">{statsData.habitsCompletedThisWeek}</div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
