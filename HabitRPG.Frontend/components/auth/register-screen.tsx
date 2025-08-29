"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Sparkles } from "lucide-react"

interface RegisterScreenProps {
  onNavigateToLogin: () => void
  onRegister: () => void
}

export function RegisterScreen({ onNavigateToLogin, onRegister }: RegisterScreenProps) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = () => {
    // Mock register - in real app, call API
    onRegister()
  }

  return (
    <div className="flex flex-col min-h-screen p-6 justify-center">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <div className="relative">
            <UserPlus className="w-16 h-16 text-primary" />
            <Sparkles className="w-6 h-6 text-level-gold absolute -top-1 -right-1" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Create Character</h1>
        <p className="text-muted-foreground text-lg">Start your journey to greatness</p>
      </div>

      {/* Register Form */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-center text-card-foreground">Character Creation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Choose your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button
            onClick={handleRegister}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
          >
            Create Character
          </Button>
          <div className="text-center">
            <button onClick={onNavigateToLogin} className="text-primary hover:text-primary/80 text-sm">
              Already have a character? Sign in
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Starting Benefits */}
      <div className="mt-8 bg-card/50 rounded-lg p-4 border border-border">
        <h3 className="text-card-foreground font-semibold mb-3 text-center">Starting Benefits</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Level 1 Character</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-level-gold rounded-full"></div>
            <span className="text-muted-foreground">0 XP to start your journey</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Unlimited habit tracking</span>
          </div>
        </div>
      </div>
    </div>
  )
}
