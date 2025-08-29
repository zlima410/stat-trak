"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Crown, Zap, Flame, Target } from "lucide-react"
import { XPProgressBar } from "@/components/ui/xp-progress-bar"

export function PlayerStats() {
  // Mock data - in real app, fetch from API
  const playerData = {
    level: 12,
    currentXP: 750,
    xpToNextLevel: 1000,
    totalXP: 11750,
    currentStreak: 7,
    longestStreak: 23,
    habitsCompleted: 156,
  }

  const xpProgress = (playerData.currentXP / playerData.xpToNextLevel) * 100

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        {/* Level and Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-level-gold" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-level-gold text-background text-xs font-bold px-2 py-1 rounded-full">
              {playerData.level}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-card-foreground">Level {playerData.level}</h2>
            <p className="text-muted-foreground">Adventurer</p>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Experience Points</span>
            <span className="text-sm font-semibold text-card-foreground">
              {playerData.currentXP} / {playerData.xpToNextLevel} XP
            </span>
          </div>
          <XPProgressBar progress={xpProgress} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="text-lg font-bold text-card-foreground">{playerData.totalXP.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total XP</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Flame className="w-6 h-6 text-streak-fire" />
            </div>
            <div className="text-lg font-bold text-card-foreground">{playerData.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Target className="w-6 h-6 text-success" />
            </div>
            <div className="text-lg font-bold text-card-foreground">{playerData.habitsCompleted}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
