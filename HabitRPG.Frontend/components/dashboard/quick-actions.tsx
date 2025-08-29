"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, CheckCircle, BarChart3, Settings } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 bg-primary/10 border-primary/20 hover:bg-primary/20"
          >
            <Plus className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">Add Habit</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 bg-success/10 border-success/20 hover:bg-success/20"
          >
            <CheckCircle className="w-6 h-6 text-success" />
            <span className="text-sm font-medium">Complete All</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 bg-chart-2/10 border-chart-2/20 hover:bg-chart-2/20"
          >
            <BarChart3 className="w-6 h-6 text-chart-2" />
            <span className="text-sm font-medium">View Stats</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-4 bg-muted/50 border-border hover:bg-muted"
          >
            <Settings className="w-6 h-6 text-muted-foreground" />
            <span className="text-sm font-medium">Settings</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
