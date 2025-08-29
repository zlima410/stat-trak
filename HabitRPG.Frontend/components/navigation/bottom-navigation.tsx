"use client"

import { Home, Target, User, BarChart3 } from "lucide-react"

type Screen = "dashboard" | "habits" | "profile" | "stats"

interface BottomNavigationProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: "dashboard" as Screen, icon: Home, label: "Home" },
    { id: "habits" as Screen, icon: Target, label: "Habits" },
    { id: "stats" as Screen, icon: BarChart3, label: "Stats" },
    { id: "profile" as Screen, icon: User, label: "Profile" },
  ]

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon
          const isActive = currentScreen === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-colors ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-card-foreground hover:bg-muted/50"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
