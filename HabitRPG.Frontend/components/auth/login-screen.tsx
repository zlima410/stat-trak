"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sword, Shield, Star } from "lucide-react"

interface LoginScreenProps {
  onNavigateToRegister: () => void
  onLogin: () => void
}

export function LoginScreen({ onNavigateToRegister, onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Mock login - in real app, call API
    onLogin()
  }

  return (
    <div className="flex flex-col min-h-screen p-6 justify-center">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <div className="relative">
            <Shield className="w-16 h-16 text-primary" />
            <Sword className="w-8 h-8 text-level-gold absolute -top-1 -right-1" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">HabitRPG 2.0</h1>
        <p className="text-muted-foreground text-lg">Level up your life, one habit at a time</p>
        <div className="flex justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-level-gold fill-current" />
          ))}
        </div>
      </div>

      {/* Login Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-center text-card-foreground">Begin Your Quest</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
          >
            Enter the Realm
          </Button>
          <div className="text-center">
            <button onClick={onNavigateToRegister} className="text-primary hover:text-primary/80 text-sm">
              New adventurer? Create your character
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Features Preview */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="space-y-2">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <Star className="w-6 h-6 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground">Earn XP</p>
        </div>
        <div className="space-y-2">
          <div className="w-12 h-12 bg-level-gold/20 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-6 h-6 text-level-gold" />
          </div>
          <p className="text-xs text-muted-foreground">Level Up</p>
        </div>
        <div className="space-y-2">
          <div className="w-12 h-12 bg-streak-fire/20 rounded-full flex items-center justify-center mx-auto">
            <Sword className="w-6 h-6 text-streak-fire" />
          </div>
          <p className="text-xs text-muted-foreground">Build Streaks</p>
        </div>
      </div>
    </div>
  )
}
