"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Award, Star } from "lucide-react"

export function RecentAchievements() {
  // Mock data - in real app, fetch from API
  const achievements = [
    {
      id: 1,
      title: "Week Warrior",
      description: "Complete habits for 7 days straight",
      icon: Trophy,
      rarity: "gold" as const,
      unlockedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Early Bird",
      description: "Complete morning habits 5 times",
      icon: Medal,
      rarity: "silver" as const,
      unlockedAt: "1 week ago",
    },
    {
      id: 3,
      title: "First Steps",
      description: "Complete your first habit",
      icon: Award,
      rarity: "bronze" as const,
      unlockedAt: "2 weeks ago",
    },
  ]

  const rarityColors = {
    gold: "text-achievement-gold",
    silver: "text-achievement-silver",
    bronze: "text-achievement-bronze",
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center gap-2">
          <Star className="w-5 h-5 text-level-gold" />
          Recent Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievements.map((achievement) => {
          const IconComponent = achievement.icon
          return (
            <div
              key={achievement.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border"
            >
              <div className={`p-2 rounded-full bg-current/10 ${rarityColors[achievement.rarity]}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-card-foreground">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground mt-1">Unlocked {achievement.unlockedAt}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
