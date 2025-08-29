"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/auth/login-screen"
import { RegisterScreen } from "@/components/auth/register-screen"
import { DashboardScreen } from "@/components/dashboard/dashboard-screen"
import { HabitsScreen } from "@/components/habits/habits-screen"
import { ProfileScreen } from "@/components/profile/profile-screen"
import { StatsScreen } from "@/components/stats/stats-screen"
import { BottomNavigation } from "@/components/navigation/bottom-navigation"

type Screen = "login" | "register" | "dashboard" | "habits" | "profile" | "stats"

export default function HabitRPGApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentScreen("dashboard")
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentScreen("login")
  }

  const renderScreen = () => {
    if (!isAuthenticated) {
      switch (currentScreen) {
        case "register":
          return <RegisterScreen onNavigateToLogin={() => setCurrentScreen("login")} onRegister={handleLogin} />
        default:
          return <LoginScreen onNavigateToRegister={() => setCurrentScreen("register")} onLogin={handleLogin} />
      }
    }

    switch (currentScreen) {
      case "habits":
        return <HabitsScreen />
      case "profile":
        return <ProfileScreen onLogout={handleLogout} />
      case "stats":
        return <StatsScreen />
      default:
        return <DashboardScreen />
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md mx-auto bg-background min-h-screen relative">
        {renderScreen()}
        {isAuthenticated && <BottomNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />}
      </div>
    </div>
  )
}
