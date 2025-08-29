"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayerStats } from "@/components/player/player-stats"
import { User, Settings, LogOut, Crown, Trophy, Flame } from "lucide-react"

interface ProfileScreenProps {
  onLogout: () => void
}

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  // Mock data - in real app, fetch from API
  const profileData = {
    username: "AdventurerPro",
    email: "adventurer@habitrpg.com",
    joinedDate: "January 2024",
    totalHabits: 15,
    completedHabits: 156,
    achievements: 8,
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <h1 className="text-2xl font-bold text-card-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your character</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Player Stats */}
        <PlayerStats />

        {/* Profile Info */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <User className="w-5 h-5" />
              Character Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Username</span>
              <span className="font-semibold text-card-foreground">{profileData.username}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-semibold text-card-foreground">{profileData.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span className="font-semibold text-card-foreground">{profileData.joinedDate}</span>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex justify-center mb-2">
                  <Crown className="w-6 h-6 text-level-gold" />
                </div>
                <div className="text-lg font-bold text-card-foreground">{profileData.totalHabits}</div>
                <div className="text-xs text-muted-foreground">Total Habits</div>
              </div>
              <div>
                <div className="flex justify-center mb-2">
                  <Trophy className="w-6 h-6 text-success" />
                </div>
                <div className="text-lg font-bold text-card-foreground">{profileData.completedHabits}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="flex justify-center mb-2">
                  <Flame className="w-6 h-6 text-streak-fire" />
                </div>
                <div className="text-lg font-bold text-card-foreground">{profileData.achievements}</div>
                <div className="text-xs text-muted-foreground">Achievements</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
